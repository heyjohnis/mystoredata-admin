import SectionTitle from "@/components/ui/section-title";
import Widget from "@/components/ui/widget";

const sizes = ["h-8", "h-16", "h-20", "h-24", "h-32"];
const outlines = [
  "ring ring-white",
  "ring ring-blue-500",
  "ring ring-green-500",
  "ring ring-red-500",
  "ring ring-black",
];
const Images: React.FC = () => (
  <>
    <SectionTitle title="UI Elements" subtitle="Images" />
    <Widget
      title="Rounded images"
      description={
        <span>
          Use the <code>.rounded</code> class for rounded images
        </span>
      }>
      <div className="flex flex-wrap justify-start items-start">
        {sizes.map((size, i) => (
          <img
            key={i}
            src="/images/27.png"
            alt="media"
            className={`${size} rounded max-w-full mr-2 mb-2`}
          />
        ))}
      </div>
    </Widget>

    <Widget
      title="Circular images"
      description={
        <span>
          Use the <code>.rounded-full</code> class for circular images
        </span>
      }>
      <div className="flex flex-wrap items-start justify-start">
        {sizes.map((size, i) => (
          <img
            key={i}
            src="/images/27.png"
            alt="media"
            className={`${size} rounded-full max-w-full mr-2 mb-2`}
          />
        ))}
      </div>
    </Widget>

    <Widget
      title="Raised images"
      description={
        <span>
          Use the <code>.shadow-lg</code> class for raised images
        </span>
      }>
      <div className="flex flex-wrap items-start justify-start">
        {sizes.map((size, i) => (
          <img
            key={i}
            src="/images/27.png"
            alt="media"
            className={`${size} rounded-full max-w-full shadow-lg mr-2 mb-2`}
          />
        ))}
      </div>
    </Widget>

    <Widget
      title="Bordered images"
      description={
        <span>
          Use the <code>.ring-color</code> classNames to add an inner border to
          your images
        </span>
      }>
      <div className="flex flex-wrap items-start justify-start">
        {outlines.map((outline, i) => (
          <img
            key={i}
            src="/images/27.png"
            alt="media"
            className={`h-16 rounded-full max-w-full mr-2 mb-2 ${outline}`}
          />
        ))}
      </div>
    </Widget>
  </>
);
export default Images;
