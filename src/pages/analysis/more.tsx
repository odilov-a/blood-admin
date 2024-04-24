import { useHooks } from "hooks";

const More = ({ moreAnalysis }: any): JSX.Element => {
  const card = moreAnalysis.data
  
  const { get, t } = useHooks();
  return (
    <div>
      {card.analysis.map((item:any) => (
        <div className="mb-[15px]">
          <p><b>{t("analysisType")}</b> - {(get(item, "analysisType", ""))}</p>
          <b>{t("fileLink")}</b> - 
          <a href={get(item, "fileLink", "")} target="_blank" rel="noopener noreferrer">
            {get(item, "fileLink", "")}
          </a>
        </div>
      ))}
    </div>
  );
};

export default More;