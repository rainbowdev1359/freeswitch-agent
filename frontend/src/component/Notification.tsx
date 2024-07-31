import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { months } from '../data/date';
import { RootState } from "../store";
import CustomButton from "./import/CustomButton";
import { useSelector } from "react-redux";
import { notificationType } from "../types/types";
import { notificationData } from '../data/notifications';
import { NotiCustomInput } from "./CustomInput";
import PoscallModal from "./modals/Postcall";
import { useTranslation } from 'react-i18next';

const CalendarContainer = styled.div`
  width: 456px; 
  padding: 24px;
  gap: 56px;
  border-radius: 12px 0px 0px 0px;
`;

const DateParagraph = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #96adb3;
`;

const DateButton = styled.div <{ color?: string, textcolor?: string }>`
    width: 196px;
    height: 40px;
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 4px;
    border-radius: 24px;
    color:${(props) => props.textcolor};
    background-color:${(props) => props.color}
`

const TabButtonRow = styled.div<{ $theme?: string }>`
  width: 100%;
  min-height: 240px;
  display: flex;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#0F2E35"};
`;

// const Paragraph = styled.div<{ $theme?: string }>`
//   margin-bottom: 0px;
//   font-weight: 500;
//   color:  ${(props) => (props.$theme == "light" ? "#0F2E35" : "#96ADB3")};
// `;

const SearchBtnContainer = styled.div`
  justify-content: flex-end;
  height: fit-content !important;
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const DateSelectButton = styled.div`
    height: 40px;
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 4px;
    border-radius: 24px;
    color: #96ADB3;
    background-color: #0F2E35;
    padding: 0 16px;
    margin-bottom: 1rem;
`

function Notification({ setUnreadNotis }: { isMonthSelector?: boolean, onApplyFilter?: () => any, setUnreadNotis: any }) {
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [notifications, setNotifications] = useState<notificationType[]>(notificationData);
    const [selectedInput, setSelectedInput] = useState<string[]>([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [notiModalShow, setNotiModalShow] = useState(false);

    function getCurrentMonth() {
        return t(months[currentMonth]);
    }

    function getCurrentYear() {
        return currentYear;
    }

    useEffect(() => {
        const data = notificationData.filter(item => item.time == `${months[currentMonth]} ${currentYear}`)
        setNotifications(data)
        setSelectedInput([])
    }, [currentYear, currentMonth]);

    useEffect(() => {
        const unread = notifications.filter(item => item.isRead == false && item.isDelete == false)
        setUnreadNotis(unread.length);
    }, [notifications]);

    function onMakeReadHandler() {
        const updatedNotifications = notifications.map(item => ({ ...item, isRead: true }));
        setNotifications(updatedNotifications);
    }

    function onDeleteHandler() {
        const updatedNotifications = notifications.map((item: notificationType) => {
            const isSelected = selectedInput.includes(item.id.toString());
            return {
                ...item,
                isDelete: isSelected ? true : item.isDelete
            };
        });
        setNotifications(updatedNotifications);
    }

    function onDeletePopupHandler() {
        const updatedNotifications = notifications.map((item: notificationType) => {
            const isSelected = selectedInput.includes(item.id.toString());
            return {
                ...item,
                isDelete: isSelected ? true : item.isDelete
            };
        });
        setNotifications(updatedNotifications);
        setNotiModalShow(false)
    }

    function handleShowSelection(val: any) {
        setSelectedInput([val])
        setNotiModalShow(true)
    }

    function onNextNotificaitonHandler() {
        var currentIndex = notifications.findIndex(item => item.id.toString() == selectedInput[0])
        setSelectedInput([notifications[currentIndex + 1].id.toString()])
    }

    return (
        <CalendarContainer>
            <div className="d-flex flex-1 justify-content-between">
                <DateParagraph>
                    Notifications
                </DateParagraph>
                <div className="d-flex gap-2">
                    <DateSelectButton>
                        {getCurrentMonth()} {getCurrentYear()}
                        <img src="/chevron_back.svg" alt="Previous" onClick={() =>
                            currentMonth !== 0
                                ? setCurrentMonth(currentMonth - 1)
                                : (setCurrentMonth(11), setCurrentYear(currentYear - 1))
                        } />
                        <img src="/chevron_next.svg" alt="Next" onClick={() =>
                            currentMonth !== 11
                                ? setCurrentMonth(currentMonth + 1)
                                : (setCurrentMonth(0), setCurrentYear(currentYear + 1))
                        } />
                    </DateSelectButton>
                </div>
            </div>

            {notifications.map((notify, index) => {
                if (!notify.isDelete) {
                    return (
                        <NotiCustomInput
                            key={index}
                            selected={selectedInput}
                            setSelected={setSelectedInput}
                            isRead={notify.isRead}
                            children={notify.message}
                            name="type"
                            value={notify.id.toString()}
                            handleShowSelection={handleShowSelection}
                        />
                    )
                }
            })}

            <div className='d-flex gap-2 mt-4'>
                <DateButton textcolor='#0A2328' color='#96ADB3' onClick={() => onMakeReadHandler()}>
                    Mark all as read
                </DateButton>
                <DateButton textcolor='#96ADB3' color='#0F2E35' onClick={() => onDeleteHandler()}>
                    Delete notification
                </DateButton>
            </div>

            <PoscallModal
                children={
                    <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
                        <div className="d-flex gap-0 flex-column">
                            <div className="d-flex flex-wrap gap-2 ">
                                <TabButtonRow $theme={theme} className="d-flex flex-column">
                                    {/* <Paragraph $theme={theme}>Notification bot</Paragraph> */}
                                    <p>{notifications.find(item => item.id.toString() == selectedInput[0])?.message}</p>
                                </TabButtonRow>
                            </div>

                            <SearchBtnContainer>
                                <CustomButton
                                    child={
                                        <div className="gap-2 align-items-center d-flex px-3" onClick={() => onDeletePopupHandler()}>
                                            <span className="mb-0">Delete</span>{" "}
                                        </div>
                                    }
                                />
                                <CustomButton
                                    child={
                                        <div className="gap-2 align-items-center d-flex px-3" onClick={() => onNextNotificaitonHandler()}>
                                            <span className="mb-0">Next notification</span>{" "}
                                            <img src={` ${theme == "light" ? "/next-light.svg" : "/nextIcon.svg"}`} alt="" />
                                        </div>
                                    }
                                />
                            </SearchBtnContainer>
                        </div>
                    </div>
                }
                show={notiModalShow}
                onHide={() => setNotiModalShow(false)}
                title={"Notification"}
            />
        </CalendarContainer>
    );
}

export default Notification;
