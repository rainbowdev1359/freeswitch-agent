import React from "react";
import { SearchBtnContainer, Title, InputRow, Input, } from "../StyleComponents";
import { DropdownButton } from "../DropDown";
import { countryLists } from "../../data/country";
import CustomButton from "../import/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from 'react-i18next';

export function PaymentMethodNew({ setCardModalShow }: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const cancelCardHandler = () => {
    setCardModalShow(false);
  }

  const saveCardHandler = () => {
    setCardModalShow(false);
  }

  const handleOutcomeSelect = async (val: string) => {
    console.log(val);
  };

  return (
    <>
      <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
        <div className="d-flex gap-0 flex-column">
          <div className="d-flex flex-column gap-2 justify-content-between mb-3" >
            <div className="d-flex gap-1 flex-column">
              <Title theme={theme}>{t('Card number')}</Title>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="number"
                  className=""
                  placeholder={t('Card number')}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-3 flex-wrap">
              <div className="d-flex flex-column" style={{ width: '48%' }}>
                <Title theme={theme}>{t('Expiry date')}</Title>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="number"
                    className=""
                    placeholder={t('mm/yy')}
                    $theme={theme}
                  />
                </InputRow>
              </div>
              <div className="d-flex flex-column" style={{ width: '48%' }}>
                <Title theme={theme}>{t('CVV')}</Title>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="number"
                    className=""
                    placeholder="000"
                    $theme={theme}
                  />
                </InputRow>
              </div>
            </div>
            <div className="d-flex gap-0 flex-column">
              <Title theme={theme}>{t('Name on card')}</Title>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('As written on card')}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <Title theme={theme}>{t('Billing address')}</Title>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Address1')}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <Title theme={theme}>{t('Office #/ Building')}</Title>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Address2')}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <Title theme={theme}>{t('Country')}</Title>
              <DropdownButton color={["white", "#185968"]} options={countryLists.map(item => item.title)} onSelect={handleOutcomeSelect} placeholder={t('Country')} isFull={true} />
            </div>
            <div className="d-flex gap-3 flex-wrap">
              <div className="d-flex flex-column" style={{ width: '48%' }}>
                <Title theme={theme}>{t('City')}</Title>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    placeholder={t('City')}
                    $theme={theme}
                  />
                </InputRow>
              </div>
              <div className="d-flex flex-column" style={{ width: '48%' }}>
                <Title theme={theme}>{t('Zip code / Postal code')}</Title>
                <InputRow $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    placeholder={t('Postal code')}
                    $theme={theme}
                  />
                </InputRow>
              </div>
            </div>
            <div className="d-flex gap-0 flex-column">
              <Title theme={theme}>{t('State, county, province, or region')}</Title>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('State, county, province, or region')}
                  $theme={theme}
                />
              </InputRow>
            </div>
          </div>
          <SearchBtnContainer>
            <CustomButton onclick={cancelCardHandler} child={<span className="mb-0">{t('Cancel')}</span>} />
            <CustomButton onclick={saveCardHandler} child={<span className="mb-0">{t('Save payment method')}</span>} />
          </SearchBtnContainer>
        </div>
      </div>
    </>
  );
}
