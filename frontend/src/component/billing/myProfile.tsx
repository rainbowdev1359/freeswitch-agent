import React, { useState, useEffect, CSSProperties } from "react";
import { Row } from "react-bootstrap";
import CircleLoader from "react-spinners/CircleLoader";
import { DropdownButton, DropdownObjectButton } from "../RoleDropDown";
import { createColumnHelper } from "@tanstack/react-table";
import { ToastContainer, toast } from "react-toastify";
import CustomTable from "../CustomTable/Table";
import { teamMembers } from "../../data/billing";
import { TeamMemberType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./billing.css";
import PoscallModal from "../modals/Postcall";
import CustomButton from "../import/CustomButton";
import {
  ActionContainer,
  ActionBtnContainer,
} from "../CustomTable/TableComponent";
import TableImageRender from "../TableImageRender";
import {
  CompanyTableContainer,
  HMod,
  EditPackageButton,
  RecordingTableContainer,
  MPParagraph,
  CustomTableContainer,
  InputRow,
  Input,
  Title,
  SearchBtnContainer,
  UploadImageButton,
} from "../StyleComponents";
import { AuthInput } from "../authentication/AuthenticationComponent";
import { exportToCsv } from "../../utils/exportCsv";
import { langList, currencyList } from "../../utils/lib";
import { useTranslation } from "react-i18next";
import services from "../../api";
import { getFormatedDate, filterGrant } from "../../utils/common";
import DeleteModal from "../modals/DeleteModal";

const columnHelper = createColumnHelper<TeamMemberType>();
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

export function MyProfile({ isActive }: { isActive?: boolean }) {
  const { t, i18n } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState(currencyList[0]);
  const [superAdminList, setSuperAdminList] =
    useState<TeamMemberType[]>(teamMembers);
  const [repassShow, setRepassShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("/company_logo.svg");
  const [roleList, setRoleList] = useState();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#D3D3D3");
  const [modifyRoleGrant, setModifyGrant] = useState(false);
  const [editMemberInfo, setEditMemberInfo] = useState({
    id: 0,
    fName: "",
    lName: "",
    email: "",
    contactnumber: "+1 815 200 4893",
    profile: {},
    role_manage: ""
  });
  const [deleteModalshow, setDeleteModalshow] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = [
    columnHelper.accessor("id", {
      header: () => <span>{t("Company ID")}</span>,
    }),
    columnHelper.accessor("companyname", {
      header: () => <span>{t("Company name")}</span>,
    }),
    columnHelper.accessor("username", {
      header: () => <span>{t("User name")}</span>,
    }),
    columnHelper.display({
      id: "role",
      header: () => <span>{t("Role")}</span>,
      cell: ({ row }) => (
        <DropdownButton
          options={roleList}
          onSelect={handleOutcomeSelect}
          placeholder={t("-")}
          isFull={false}
          profile={row.original.profile}
          modifyRoleGrant={modifyRoleGrant}
        />
      ),
    }),
    columnHelper.accessor("date_joined", {
      header: () => <span>{t("Joined")}</span>,
      cell: (info) => (
        <p className="mb-0" style={{ fontSize: "14px", width: "200px" }}>
          {getFormatedDate(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("email", {
      header: () => <span>{t("Email address")}</span>,
    }),
    columnHelper.accessor("profile.phone_number", {
      header: () => <span>{t("Phone number")}</span>,
    }),
    columnHelper.display({
      id: "reset",
      header: () => <span>{t("Reset")}</span>,
      cell: (_props: any) => (
        <>
          {modifyRoleGrant && (
            <EditPackageButton
              $theme={theme}
              className=""
              onClick={() => resetPasswordHandler(_props.row.original)}
            >
              {t("Reset password")}
            </EditPackageButton>
          )}
        </>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span>{t("Actions")}</span>,
      cell: (props: any) => (
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {modifyRoleGrant && (
            <>
              <ActionContainer
                $theme={theme}
                onClick={() => memberEditHandler(props.row.original)}
              >
                <TableImageRender light="/edit2-light.svg" dark="/edit.svg" />
              </ActionContainer>
              <ActionContainer
                $theme={theme}
                onClick={() => memberDeleteHandler(props.row.original)}
              >
                <TableImageRender
                  light="/delete-light.svg"
                  dark="/delete.svg"
                />
              </ActionContainer>
              {/* <ActionBtnContainer
                style={{ fontSize: "12px" }}
                $theme={theme}
                onClick={() => exportHandler(props.row.index)}
              >
                {t("Save")}
              </ActionBtnContainer> */}
            </>
          )}
        </Row>
      ),
    }),
  ];

  useEffect(() => {
    if (isActive || loading) {
      const initLan = localStorage.getItem("language") || "en";
      setLanguage(initLan);
      console.log(currency);
      console.log(language);
      // setSuperAdminList(teamMembers);

      getRefreshUserList();

      const permissions = JSON.parse(
        localStorage.getItem("permissions") || "[]"
      );
      const _modifyRoleGrant = filterGrant(permissions, "Modify users role");
      setModifyGrant(_modifyRoleGrant);
    }
  }, [isActive, loading]);

  const handleOutcomeSelect = async (
    groupID: string,
    userProfileID: number
  ) => {
    if (editShow) {
      setEditMemberInfo({...editMemberInfo, role_manage: groupID});
      return;
    }

    setLoading(true);
    setEditMemberInfo({...editMemberInfo, role_manage: groupID});
    services.billing.setUserRole({ user_profile_id: userProfileID, role_manage_id: groupID })
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
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleLanguageSelect = async (val: string) => {
    localStorage.setItem("language", val);
    i18n.changeLanguage(val);
    setLanguage(val);
    console.log(val);
  };

  const handleCurrencySelect = async (val: string) => {
    setCurrency(val);
  };

  const memberEditHandler = (info: {}) => {
    setEditShow(true);
    setEditMemberInfo({
      ...editMemberInfo,
      id: info.id,
      fName: info.first_name,
      lName: info.last_name,
      email: info.email,
      contactnumber: info.profile.phone_number,
      profile: info.profile,
      role_manage: info.profile.role_manage
    });
  };

  const onMemberEdit = () => {
    services.user.updateUser({
      first_name: editMemberInfo.fName,
      last_name: editMemberInfo.lName,
      email: editMemberInfo.email,
      phone: editMemberInfo.contactnumber,
      user_id: editMemberInfo.id,
      group_id: editMemberInfo.role_manage
    })
      .then((response) => {
        getRefreshUserList();
        setEditShow(false);
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
      .catch((error) => {
        console.log(error);
      });
  };

  const memberDeleteHandler = (info: {}) => {
    setEditMemberInfo(info);
    setDeleteModalshow(true);
  };

  const onDeleteMember = () => {
    services.user.removeUser({ user_id: editMemberInfo.id })
      .then((response) => {
        setDeleteModalshow(false);
        setLoading(true);
        getRefreshUserList();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  
  const getRefreshUserList = () => {
    services.billing.getUserList().then((response) => {
      setSuperAdminList(response.data.users);
      setRoleList(response.data.groups);
      setLoading(false);
    });
  }

  const resetPasswordHandler = (info: {}) => {
    setEditMemberInfo(info);
    setRepassShow(true);
  };

  const savePassHandler = () => {
    if (oldPassword != newPassword) {
      setValidationMessage("New password and confirm password do not match.");
      return;
    } else {
      setValidationMessage("");
      setOldPassword("");
      setNewPassword("");

      services.user.resetpassword({ user_id: editMemberInfo.id, new_password: newPassword })
        .then((response) => {
          toast.success(response.data.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setRepassShow(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const exportHandler = (selected: number) => {
    const exportArray = superAdminList.filter(
      (_item, index) => index === selected
    );
    const headers = [
      t("Company ID"),
      t("Company name"),
      t("User name"),
      t("Role"),
      t("Joined"),
      t("Email address"),
      t("Phone number"),
    ];

    const rows = exportArray.map((row: any) => [
      row.id,
      row.companyName,
      row.userName,
      row.role,
      row.date,
      row.email,
      row.phone,
    ]);
    exportToCsv(`${exportArray[0].id}_team_member_data.csv`, [
      headers,
      ...rows,
    ]);
  };

  const exportAll = () => {
    const headers = [
      "Company ID",
      "Company name",
      "User name",
      "Role",
      "Joined",
      "Email address",
      "Phone number",
    ];
    const rows = superAdminList.map((row: any) => [
      row.id,
      row.companyName,
      row.userName,
      row.role,
      row.date,
      row.email,
      row.phone,
    ]);
    exportToCsv("team_members_data.csv", [headers, ...rows]);
  };
  return (
    <RecordingTableContainer className="">
      <ToastContainer />
      {loading && (
        <CircleLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <div className="d-flex flex-wrap gap-4 justify-content-between">
        <CompanyTableContainer
          theme={theme}
          className="flex-grow-1"
          style={{ minWidth: "360px", width: "60%" }}
        >
          <div className="d-flex flex-column gap-1 justify-content-between">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex gap-1 flex-column">
                <Title theme={theme}>{t("Organization Profile")}</Title>
                <MPParagraph className="mb-0">
                  {t("Edit company details")}
                </MPParagraph>
              </div>
              <div className="d-flex gap-2 flex-row align-items-center">
                <img
                  src={imageSrc}
                  width={80}
                  height={80}
                  alt="Previous"
                  className="rounded-3"
                />
                <div className="d-flex gap-1 flex-column">
                  <Title theme={theme}>{t("Company logo")}</Title>
                  <UploadImageButton $theme={theme} htmlFor="logo">
                    {t("Upload image")}
                  </UploadImageButton>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row gap-4">
              <div
                className="d-flex gap-0 flex-column"
                style={{ width: "50%" }}
              >
                <Title theme={theme}>{t("Company name")}</Title>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    $theme={theme}
                    placeholder={t("Epic Caller AI")}
                  />
                </InputRow>
              </div>
              <div
                className="d-flex gap-0 flex-column"
                style={{ width: "50%" }}
              >
                <Title theme={theme}>{t("Slug URL")}</Title>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    $theme={theme}
                    placeholder={t("Must be lower case with no space")}
                  />
                </InputRow>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <EditPackageButton $theme={theme} className="">
                {t("Save")}
              </EditPackageButton>
            </div>
          </div>
        </CompanyTableContainer>

        <CompanyTableContainer theme={theme} className="flex-grow-1">
          <div className="d-flex flex-column gap-4">
            <div className="d-flex gap-1 flex-column">
              <Title theme={theme}>{t("Choose language")}</Title>
              <DropdownObjectButton
                color={["white", "#185968"]}
                options={langList}
                onSelect={handleLanguageSelect}
                isFull={true}
              />
            </div>
            <div className="d-flex gap-1 flex-column">
              <Title theme={theme}>{t("Choose currency")}</Title>
              <DropdownButton
                color={["white", "#185968"]}
                options={currencyList}
                onSelect={handleCurrencySelect}
                placeholder="USD"
                isFull={true}
              />
            </div>
            <div className="d-flex justify-content-end">
              <EditPackageButton $theme={theme} className="">
                {t("Save")}
              </EditPackageButton>
            </div>
          </div>
        </CompanyTableContainer>
      </div>

      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between pt-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t("Team Members")}</HMod>
          <MPParagraph>
            {t("View and manage organization members.")}
          </MPParagraph>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <EditPackageButton $theme={theme} className="" onClick={exportAll}>
            {t("Export pdf")}
          </EditPackageButton>
          <EditPackageButton $theme={theme} className="">
            {t("Invite members")}
          </EditPackageButton>
        </div>
      </div>

      <CustomTableContainer className="table_container">
        <CustomTable
          data={superAdminList}
          theme={theme}
          columns={columns}
          hideCheckbox
        />
      </CustomTableContainer>

      <PoscallModal
        children={
          <div
            className={`d-flex  flex-column gap-1 ${
              theme == "light" ? "light" : ""
            }`}
          >
            <div className="d-flex gap-0 flex-column">
              <div className="d-flex flex-column gap-2 justify-content-between mb-3">
                <AuthInput
                  placeholder={t("SET NEW PASSWORD")}
                  icon="/lock.svg"
                  inputType="password"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    setValidationMessage("");
                  }}
                />
                <AuthInput
                  placeholder={t("CONFIRM NEW PASSWORD")}
                  icon="/lock.svg"
                  inputType="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setValidationMessage("");
                  }}
                />
                {validationMessage && (
                  <p style={{ color: "red" }}>{validationMessage}</p>
                )}
              </div>

              <SearchBtnContainer>
                <CustomButton
                  onclick={() => setRepassShow(false)}
                  child={<span className="mb-0">{t("Cancel")}</span>}
                />
                <CustomButton
                  onclick={savePassHandler}
                  child={<span className="mb-0">{t("Continue")}</span>}
                />
              </SearchBtnContainer>
            </div>
          </div>
        }
        show={repassShow}
        onHide={() => setRepassShow(false)}
        title={
          <div
            className="d-flex flex-column gap-2 text-start"
            style={{ paddingLeft: "12px" }}
          >
            <Title theme={theme}>{t("Reset your password")}</Title>
            <p
              style={{
                color: "#57757B",
                fontSize: "14px",
                marginBottom: "0px",
              }}
            >
              {t("Reset password for your team member")}
            </p>
          </div>
        }
      />

      <PoscallModal
        children={
          <div
            className={`d-flex  flex-column gap-1 ${
              theme == "light" ? "light" : ""
            }`}
          >
            <div className="d-flex gap-0 flex-column">
              <div className="d-flex flex-column gap-3 justify-content-between mb-3">
                <div className="d-flex  gap-2 flex-column">
                  <p className="mb-0">{t("First name")}</p>
                  <InputRow className="" $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      $theme={theme}
                      placeholder={t("First name")}
                      value={editMemberInfo.fName}
                      onChange={(event) =>
                        setEditMemberInfo({
                          ...editMemberInfo,
                          fName: event.target.value,
                        })
                      }
                    />
                  </InputRow>
                </div>
                <div className="d-flex  gap-2 flex-column">
                  <p className="mb-0">{t("Last name")}</p>
                  <InputRow className="" $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      $theme={theme}
                      placeholder={t("Last name")}
                      value={editMemberInfo.lName}
                      onChange={(event) =>
                        setEditMemberInfo({
                          ...editMemberInfo,
                          lName: event.target.value,
                        })
                      }
                    />
                  </InputRow>
                </div>
                <div className="d-flex  gap-2 flex-row">
                  <div className="d-flex  gap-2 flex-column w-50">
                    <p className="mb-0">{t("Email address")}</p>
                    <InputRow className="" $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        $theme={theme}
                        placeholder={t("Email address")}
                        value={editMemberInfo.email}
                        onChange={(event) =>
                          setEditMemberInfo({
                            ...editMemberInfo,
                            email: event.target.value,
                          })
                        }
                      />
                    </InputRow>
                  </div>
                  <div className="d-flex gap-2 flex-column w-50">
                    <p className="mb-0">{t("Phone number")}</p>
                    <InputRow $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        $theme={theme}
                        placeholder="e.g +1 815 200 4893"
                        value={editMemberInfo.contactnumber}
                        onChange={(event) =>
                          setEditMemberInfo({
                            ...editMemberInfo,
                            contactnumber: event.target.value,
                          })
                        }
                      />
                    </InputRow>
                  </div>
                </div>
                <div className="d-flex gap-2 flex-column">
                  <p className="mb-0">{t("Role")}</p>
                  <DropdownButton
                    options={roleList}
                    onSelect={handleOutcomeSelect}
                    placeholder={t("-")}
                    isFull={true}
                    profile={editMemberInfo}
                  />
                </div>
              </div>

              <SearchBtnContainer>
                <CustomButton
                  onclick={() => setEditShow(false)}
                  child={<span className="mb-0">{t("Cancel")}</span>}
                />
                <CustomButton
                  onclick={onMemberEdit}
                  child={<span className="mb-0">{t("Save")}</span>}
                />
              </SearchBtnContainer>
            </div>
          </div>
        }
        show={editShow}
        onHide={() => setEditShow(false)}
        title={
          <div
            className="d-flex flex-column gap-2 text-start"
            style={{ paddingLeft: "12px" }}
          >
            <Title theme={theme}>{t("Edit team member")}</Title>
            <p
              style={{
                color: "#57757B",
                fontSize: "14px",
                marginBottom: "0px",
              }}
            >
              {t("Edit your team member information.")}
            </p>
          </div>
        }
      />
      <DeleteModal
        onHide={() => setDeleteModalshow(false)}
        onCancel={() => setDeleteModalshow(false)}
        show={deleteModalshow}
        title={t("Are you sure you want to delete this member?")}
        subTitle={" "}
        cancelTitle={t("Cancel")}
        confirmTitle={t("Yes")}
        onContinue={() => onDeleteMember()}
      />
    </RecordingTableContainer>
  );
}
