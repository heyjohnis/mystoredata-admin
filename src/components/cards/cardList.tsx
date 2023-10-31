import {Input} from "components/forms/input";
import {CardProps} from "model/card";
import {useState} from "react";
import {InputWrapper} from "components/forms/input-wrapper";
import CardInput from "./cardInput";
import {PUT, DELETE, POST} from "utils/restApi";
import {CardCode, tradeKind, UsePurpose} from "data/commonCode";
import CommonCodeSelect from "components/CommonCodeSelect";

export default function CardList({cards, user, baseMonth}: any) {
  const [form, setForm] = useState<CardProps>();
  const [cardList, setCardList] = useState<CardProps[]>(cards);
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setForm((prevState: any) => ({...prevState, [name]: value}));
  };

  const addCard = (card: CardProps) => {
    setCardList((prevState: any) => [...prevState, card]);
  };

  const cardDetail = () => {
    console.log("card detail");
  };

  const cardDelete = (card: CardProps) => {
    DELETE(`card/delete/${card._id}`)
      .then((res: any) => {
        console.log("card/delete: ", res);
        if (res?.status === 200) {
          setCardList(
            cardList.filter(
              (item: CardProps) => item.cardNum !== card.cardNum
            ) || []
          );
        }
      })
      .catch((err: any) => {
        console.log("card/delete: ", err);
      });
  };

  const syncCardLog = (card: CardProps) => {
    console.log("syncCardLog: ", card);
    POST("card/regLog", {...card, corpNum: user.corpNum, baseMonth})
      .then((res: any) => {
        if (res?.status === 200) alert("데이터 수집이 완료되었습니다.");
        console.log("card/regLog: ", res);
      })
      .catch((err: any) => {
        console.log("card/regLog: ", err);
      });
  };

  const addCreditCard = (card: CardProps) => {
    const {_id, userId, corpNum, corpName} = user;
    POST("credit-card/reg", {
      user: _id,
      userId,
      corpNum,
      corpName,
      finName: CardCode[card.cardCompany],
      finItemCode: "CRDCARD",
      finItemName: "신용카드",
      cardNum: card.cardNum,
      card: card._id,
      transRemark: card.cardNum,
    }).then((res: any) => {
      console.log({res});
      if (res?.data?._id) {
        alert("신용카드 등록이 완료되었습니다.");
      }
    });
  };

  const handleChangeUsePurpose = async (card: CardProps) => {
    const result = await PUT("card/update", {...card});
    console.log({result});
  };

  return (
    <div className="w-full overflow-x-auto mt-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="text-l font-bold">카드정보</div>
        </div>
      </div>
      <div className="w-full">
        <CardInput addCard={addCard} user={user} />
        {cardList &&
          cardList.map((card: CardProps, i: any) => (
            <div key={i} className="flex justify-between">
              <div className="flex">
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    width="w-25"
                    name="bankAccountType"
                    placeholder="기업유형"
                    value={card["cardType"]}
                    commonCode={{C: "법인", P: "개인"}}
                    onChange={handleChange}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    name="cardCompany"
                    commonCode={CardCode}
                    onChange={handleChange}
                    value={card?.cardCompany}
                    disabled={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    name="tradeKind"
                    commonCode={tradeKind}
                    onChange={handleChange}
                    value={card?.tradeKind}
                    disabled={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <Input
                    name="cardNum"
                    type="text"
                    width="w-36"
                    placeholder="카드번호"
                    value={card?.cardNum}
                    onChange={handleChange}
                    readOnly={true}
                  />
                </InputWrapper>
                <InputWrapper outerClassName="sm:col-span-4 mt-2 mr-2">
                  <CommonCodeSelect
                    name="useKind"
                    commonCode={UsePurpose}
                    value={card?.useKind}
                    placeholder="사용목적"
                    onChange={(e) =>
                      handleChangeUsePurpose({
                        ...card,
                        useKind: e.target.value,
                      })
                    }
                  />
                </InputWrapper>
              </div>
              <div className="flex">
                {card.tradeKind === "CREDIT" && (
                  <button
                    type="button"
                    onClick={() => addCreditCard(card)}
                    className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    신용카드등록
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => syncCardLog(card)}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  데이터수집
                </button>
                <button
                  type="button"
                  onClick={() => cardDetail()}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  상세보기
                </button>
                <button
                  type="button"
                  onClick={() => cardDelete(card)}
                  className="sm:col-span-4 mt-2 mr-2 px-4 text-xs font-bold text-white bg-gray-500 rounded-lg hover:bg-blue-600">
                  삭제
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
