import React, { useEffect, useState } from "react";
import { AgentCallSetting } from "./AgentCallSetting";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
// import callsApi from "../../api/calls"
import { agentCallSetting } from "../../data/agents";
import { agentCalls } from "../../types/types";
import { useTranslation } from 'react-i18next';
import {
  AgentRowContainer,
  ImgMod,
  InputMod,
  AgentCallSettingContainer,
} from "../StyleComponents";
import services from "../../api";

function AgentRow() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [search, setSearch] = useState("")
  const [callRecords, setCallRecords] = useState<agentCalls[]>([])

  useEffect(() => {
    // const interval = setInterval(() => {
    //     callsApi.getAllCalls()
    //       .then(response => {
    //             setCallRecords(response.data.results);
    //       })
    //         .catch(error => console.error('Failed to fetch call data:', error));
    // }, 5000);

    // return () => clearInterval(interval);

    // dumy
    services.agent.getAllAgents()
    .then(response => {
      const agentList = response.data
        const updatedResults = agentList.map((result: any) => {
          return { ...result,
            profile: "/agents/agent03.png",
            name: result.info[0].value,
            rateTime: 3.5,
            incomingCalls: [],
            finishedCalls: [],
            date: "2024-06-28",
            time: "0",
            client1: 0,
            client2: 0,
           }
        })
      setCallRecords(updatedResults)
    })
    .catch(error => console.error('Failed to fetch call data:', error));
    
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const filteredData = val !== "" ? agentCallSetting.filter(item => item.info[0].value.toLocaleLowerCase().includes(val.toLocaleLowerCase())) : agentCallSetting;
    setSearch(val)
    setCallRecords(filteredData);
  };

  return (
    <AgentRowContainer theme={theme} className="d-flex agent-row flex-column gap-1" >
      <div className="position-relative  w-100">
        <InputMod
          theme={theme}
          type="text"
          placeholder={t('Search')}
          className="pt-2 px-3 w-100"
          value={search}
          onChange={handleSearch}
        />
        <ImgMod src="/searchIcons.png" />
      </div>
      <AgentCallSettingContainer className=" gap-2">
        {callRecords.map((agent: agentCalls, index: number) => (
          // @ts-ignore
          !agent.call_ended && (
            <AgentCallSetting key={index} agent={agent} />
          )
        ))}
      </AgentCallSettingContainer>
    </AgentRowContainer>
  );
}

export default AgentRow;
