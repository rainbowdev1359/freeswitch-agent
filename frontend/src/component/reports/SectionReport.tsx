import { ReportComponent } from "./ReportComponent";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TabButtonRow, HMod, PMode } from "../StyleComponents";

export function SectionReport() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  
  return (
    <>
      <div className="d-flex flex-column p-4">
        <HMod theme={theme}>{t("Reports")}</HMod>
        <PMode>{t("Here are the current admins running servers on sales agent")}</PMode>
      </div>
      <div className="d-flex px-4  justify-content-between align-items-center">
        <TabButtonRow $theme={theme}>Agents report</TabButtonRow>
      </div >
      <div className="d-flex row p-4">
        <div className="col-12 col-md-6 col-lg-3">
          <ReportComponent type="bar" title={t("AI Performance score")} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <ReportComponent type="pie" title={t("Top Agents")} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <ReportComponent type="pie" title={t("Bottom agents")} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <ReportComponent type="table" title={null} />
        </div>
      </div>
    </>
  );
}
