import React, {useEffect, useState} from "react";
import {TradeAnalysis} from "@/components/trade/TradeAnalysis";

type FormProp = {
  tradeKind?: string;
  date?: string;
  kind?: string;
  category?: string;
  memo?: string;
  amount?: number;
  account?: string;
  itemName?: string;
  tax?: number;
};

export default function TradeAnalysisPage() {
  return <TradeAnalysis />;
}
