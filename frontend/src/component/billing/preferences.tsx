import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { countryLists } from "../../data/country";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DropdownButton } from "../DropDown";
import 'react-datepicker/dist/react-datepicker.css';
import './billing.css'
import 'react-phone-number-input/style.css';
import { CompanyTableContainer, MPTitle, MPParagraph, LinkP, UnderLineSpan, InputRow, Input } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

export function Preferences() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  useEffect(() => {
    console.log(showCreateCompany);
  }, [showCreateCompany]);

  const handleOutcomeSelect = async (val: string) => {
    console.log(val);
  };

  return (
    <>
      <CompanyTableContainer theme={theme} className="flex-grow-1">
        <div className="d-flex flex-lg-row flex-column items-center justify-content-between">
          <Col>
            <MPTitle theme={theme}>{t('Preferences')}</MPTitle>
            <MPParagraph>{t('Changes to these preferences will apply to future invoices only. If you need a past invoice re-issued, please contact Epic Caller AI support team')}</MPParagraph>
          </Col>
        </div>

        <div className="d-flex flex-row gap-4 justify-content-between" >
          <div style={{ width: '50%' }}>
            <div className="d-flex mb-3 flex-column">
              <MPTitle theme={theme}>{t('Company Name')}</MPTitle>
              <MPParagraph className="mb-4">{t('If specified, The name will appear on invoices instead of your organization name')}</MPParagraph>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Epic caller')}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="d-flex mb-3 flex-column">
              <MPTitle theme={theme}>{t('Phone number')}</MPTitle>
              <MPParagraph className="mb-0">{t('Your Phone number will be displayed on future invoices')}</MPParagraph>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Phone number')}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="d-flex mb-3 flex-column">
              <MPTitle theme={theme}>{t('Billing email')}</MPTitle>
              <MPParagraph className="mb-0">{t('Invoices and other billing notifications will be sent here (in addition to being sent to the owners of your organization)')}</MPParagraph>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Company email')}
                  $theme={theme}
                />
              </InputRow>
            </div>
          </div>
          <div style={{ width: '50%' }} >
            <div className="d-flex mb-3 flex-column">
              <MPTitle theme={theme}>{t('Primary business address')}</MPTitle>
              <MPParagraph className="mb-0">{t('This is the address of the company purchasing should match the credit card.')}</MPParagraph>
              <MPTitle theme={theme}>{t('Country')}</MPTitle>
              <DropdownButton color={["white", "#185968"]} options={countryLists.map(item => item.title)} onSelect={handleOutcomeSelect} placeholder={t('Country')} isFull={true} />
            </div>
            <div className="d-flex mb-3 flex-column">
              <MPTitle theme={theme} className="mb-2">{t('Address line 1')}</MPTitle>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Address line 1')}
                />
              </InputRow>
            </div>
            <div className="d-flex mb-3 flex-column">
              <MPTitle theme={theme} className="mb-2">{t('Address line 2')}</MPTitle>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Address line 2')}
                />
              </InputRow>
            </div>
            <div className="d-flex mb-3 gap-3 flex-wrap mt-2">
              <div className="d-flex flex-column" style={{ width: '48%' }}>
                <MPTitle theme={theme}>{t('City')}</MPTitle>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    placeholder={t('City')}
                  />
                </InputRow>
              </div>
              <div className="d-flex flex-column" style={{ width: '48%' }}>
                <MPTitle theme={theme}>{t('State')}</MPTitle>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    placeholder={t('State')}
                  />
                </InputRow>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <LinkP
            $theme={theme}
            onClick={() => setShowCreateCompany(true)}
            className="text-lg-end text-center px-3 py-2 mb-lg-0 mb-2"
          >
            <UnderLineSpan>{t('Save preferences')}</UnderLineSpan>
          </LinkP>
        </div>
      </CompanyTableContainer>
    </>
  );
}
