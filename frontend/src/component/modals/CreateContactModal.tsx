/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styled from "styled-components";
import CenteredModal from './Modal';
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { DropdownButton } from "../DropDown";
import contact from "../../api/contacts";
import { useTranslation } from 'react-i18next';
import { ContactTableType } from "../../types/types"; // Import the type from the central file

const InputRow = styled.div<{ $theme?: string }>`
  display: flex;
  padding: 8px 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.$theme === "light" ? "#FEFEFE" : "#051316"};
`;

const Input = styled.input<{ $theme?: string }>`
  flex-grow: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.$theme === "light" ? "#051316" : "white"};
`;

interface CreateContactModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  onContinue: () => void;
  modalTitle?: string;
  setTableData: React.Dispatch<React.SetStateAction<ContactTableType[]>>;
  tableData: ContactTableType[];
}

const CreateContactModal: React.FC<CreateContactModalProps> = (props) => {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('+1 815 200 4893');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyAddr, setCompanyAddr] = useState<string>('');
  const [campaign, setCampaign] = useState<string>('');
//   const [list, setList] = useState<string>('');
  const [country, setCountry] = useState<string>(''); // Add country state if needed

  const handleCampaignSelect = (val: string) => {
    setCampaign(val);
    console.log(val);
  };

  const handleCountrySelect = (val: string) => {
    setCountry(val);
    console.log(val);
  };

  const onContinue = async () => {
    try {
      const response = await contact.createNewContact({
        firstName: fName,
        lastName: lName,
        email: email,
        phoneNumber: contactNumber,
        country: country, // Provide the country if applicable
        companyName: companyName,
        companyAddr: companyAddr,
        campaign: campaign,
        // list: list,
        addedDate: new Date().toISOString(), // Assuming addedDate is current date
      });
      // Update table data with the new contact
      props.setTableData((prevData) => [...prevData, response.data as ContactTableType]);
      props.setShow(false);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <CenteredModal
      onHide={() => props.setShow(false)}
      onContinue={onContinue}
      show={props.show}
      title={props.modalTitle ? props.modalTitle : t("Add a new contact")}
      btntext={t("Save")}
    >
      <div className="d-flex flex-column gap-3">
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("First name")}</p>
          <InputRow $theme={theme}>
            <Input
              type="text"
              placeholder={t("First name")}
              value={fName}
              onChange={(event) => setFName(event.target.value)}
              $theme={theme}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Last name")}</p>
          <InputRow $theme={theme}>
            <Input
              type="text"
              placeholder={t("Last name")}
              value={lName}
              onChange={(event) => setLName(event.target.value)}
              $theme={theme}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Email address")}</p>
          <InputRow $theme={theme}>
            <Input
              type="text"
              placeholder={t("Email address")}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              $theme={theme}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Phone number")}</p>
          <InputRow $theme={theme}>
            <Input
              type="text"
              placeholder="e.g +1 815 200 4893"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              $theme={theme}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Company name")}</p>
          <InputRow $theme={theme}>
            <Input
              type="text"
              placeholder={t("Company name")}
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              $theme={theme}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Company address")}</p>
          <InputRow $theme={theme}>
            <Input
              type="text"
              placeholder={t("Company address")}
              value={companyAddr}
              onChange={(event) => setCompanyAddr(event.target.value)}
              $theme={theme}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Campaign")}</p>
          <InputRow className="p-0" $theme={theme}>
            <DropdownButton
              color={["#E5ECEE", "#051316"]}
              options={["Epic Caller AI"]} // Provide actual options here
              onSelect={handleCampaignSelect}
              placeholder={t("Campaign")}
              isFull={false}
            />
          </InputRow>
        </div>
        <div className="d-flex gap-0 flex-column">
          <p className="mb-0">{t("Country")}</p>
          <InputRow className="p-0" $theme={theme}>
            <DropdownButton
              color={["#E5ECEE", "#051316"]}
              options={["Untied States", "United Kingdom"]} // Provide actual options here
              onSelect={handleCountrySelect} // Change this if a different handler is needed
              placeholder={t("Country")}
              isFull={false}
            />
          </InputRow>
        </div>
      </div>
    </CenteredModal>
  );
};

export default CreateContactModal;