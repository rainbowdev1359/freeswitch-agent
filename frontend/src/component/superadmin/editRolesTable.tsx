import React, { useState, useEffect, CSSProperties  } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import CircleLoader from "react-spinners/CircleLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTable from "../CustomTable/Table";
import { superRoleTableData } from "../../data/superadmin";
import { SuperRoleTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./superadmin.css";
import { HMod, EditPackageButton, RecordingTableContainer, MPParagraph, } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import PageBackButton from "../PageBackButton";
import services from '../../api';

const columnHelper = createColumnHelper<SuperRoleTableType>();
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#D3D3D3",
  position: "absolute",
  zIndex: "9999",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function EditRolesTable() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [superAdminList, setSuperAdminList] = useState<SuperRoleTableType[]>(superRoleTableData);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  const columns = [
    columnHelper.accessor("action_section", {
      header: () => <span>{t('Action/Section')}</span>,
      cell: (info) => <p className="mb-0" style={{ fontSize: "14px", width: "150px" }}>{info.getValue()}</p>,
    }),
    columnHelper.accessor("sub_category", {
      header: () => <span>{t('Sub-category')}</span>,
      cell: (info) => <p className="mb-0" style={{ fontSize: "14px", width: "200px" }}>{info.getValue()}</p>,
    }),
    columnHelper.display({
      id: "super_admin",
      header: () => <p className="text-center my-2">{t('Super Admin')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.super_admin}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "admin",
      header: () => <p className="text-center my-2">{t('Admin')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.admin}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "technical_support",
      header: () => <p className="text-center my-2">{t('Technical Support')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.technical_support}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "customer_support",
      header: () => <p className="text-center my-2">{t('Customer Support')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.customer_support}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "billing_support",
      header: () => <p className="text-center my-2">{t('Billing Support')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.billing_support}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "marketing_branding",
      header: () => <p className="text-center my-2">{t('Marketing Branding')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.marketing_branding}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "representative",
      header: () => <p className="text-center my-2">{t('Representative')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.representative} 
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
    columnHelper.display({
      id: "representative_assistance",
      header: () => <p className="text-center my-2">{t('Representative Assistance')}</p>,
      cell: ({ row, column }) => <input className="m-auto" type="checkbox" checked={superAdminList[row.id]?.representative_assistance}
      onChange={(e) => handleCheckboxChange(row.id, column.id, e.target.checked)} />,
    }),
  ];

  const handleCheckboxChange = (rowId: string, columnId: string, checked: boolean) => {
    const updatedRowData = superAdminList.map((row) =>
      row.id == rowId ? { ...row, [columnId]: checked } : row
    );
    // console.log("updatedRowData = ", rowId, columnId, checked, updatedRowData[rowId]);
    setSuperAdminList(updatedRowData);
  };

  useEffect(() => {
    setSuperAdminList(superRoleTableData);
    services.roles.getRoleGrant()
    .then((response) => {
      setSuperAdminList(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000, // Adjusted autoClose duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
  }, []);

  const onSaveRolesHandler = () => {
    setLoading(true);
    services.roles.updateRoleGrant(superAdminList)
    .then((response) => {
      setLoading(false);
      toast.success(response.data.success, {
        position: "top-right",
        autoClose: 5000, // Adjusted autoClose duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000, // Adjusted autoClose duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
  }

  return (
    <>
      <ToastContainer />
      {loading && <div style={{ }}>
        <CircleLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
      </div>}

      <RecordingTableContainer className="">
            <PageBackButton />
            <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between">
              <div className="d-flex flex-column">
                <HMod theme={theme}>{t("Roles Permissions")}</HMod>
                <MPParagraph>{t("Adjust accordingly")}</MPParagraph>
              </div>
              <div className="d-flex gap-2 justify-content-end mb-3">
                {/* <EditPackageButton $theme={theme} className="" >{t("Add a Role")}</EditPackageButton>
                <EditPackageButton $theme={theme} className="" >{t("Add a Row")}</EditPackageButton> */}
                <EditPackageButton $theme={theme} className="" onClick={() => onSaveRolesHandler()}>{t("Save")}</EditPackageButton>
              </div>
            </div>

            <CustomTable
              data={superAdminList}
              theme={theme}
              hideCheckbox
              hidePagination
              pageSize={100}
              columns={columns}
            />
          </RecordingTableContainer>
    </>
  );
}

export default EditRolesTable;