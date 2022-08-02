import { useState } from 'react'
import { sp } from '@pnp/sp'
import '@pnp/sp/webs'
import '@pnp/sp/files'
import '@pnp/sp/items'
import '@pnp/sp/lists'
import '@pnp/sp/fields'

//Gets all Dart Data

export const useConfigModule = () => {
    const dartDataList = 'dartData';

    //State for all dartData list items
    const [allItemsDART, setallItemsDART] = useState([{}]);
    //State for all AOC choices
    const [AOCChoiceArr, setAOCChoiceArr] = useState([]);
    //State for all MTF choices
    const [MTFChoiceArr, setMTFChoiceArr] = useState([]);
    //State for all MTF choices
    const [MsnTypeArr, setMsnTypeChoiceArr] = useState([]);
    //State for all MTF choices
    const [StatusArr, setStatusChoiceArr] = useState([]);
    //State for all Ranks
    const [rankChoiceArr, setRankChoiceArr] = useState([]);
    //Getting Data for BAMC

    //Gets all AOC Choices
    const getAOCchoices = async () => {
        const AOCChoices = await sp.web.lists
            .getByTitle(dartDataList)
            .fields.getByInternalNameOrTitle('aocMos')
            .get();
        setAOCChoiceArr(AOCChoices.Choices.results.sort());
    };
    //Gets All MTF Choices
    const getMTFchoices = async () => {
        const MTFChoices = await sp.web.lists
            .getByTitle(dartDataList)
            .fields.getByInternalNameOrTitle('mtfLocation')
            .get();
        setMTFChoiceArr(MTFChoices.Choices.results.sort());
    };
    //Gets All Mission Type choices
    const getMsnTypeChoices = async () => {
        const MsnChoices = await sp.web.lists
            .getByTitle(dartDataList)
            .fields.getByInternalNameOrTitle('missionType')
            .get();
        setMsnTypeChoiceArr(MsnChoices.Choices.results.sort());
    };
    //Gets Status Type Choices
    const getStatusTypechoices = async () => {
        const statusChoices = await sp.web.lists
            .getByTitle(dartDataList)
            .fields.getByInternalNameOrTitle('status')
            .get();
        setStatusChoiceArr(statusChoices.Choices.results.sort());
    };
    //Gets Rank Types
    const getRankChoices = async () => {
        const rankChoices = await sp.web.lists
            .getByTitle(dartDataList)
            .fields.getByInternalNameOrTitle('rank')
            .get();
        setRankChoiceArr(rankChoices.Choices.results.sort());
    };

    //Gets all Dart List Items
    const getAllDartListItems = async () => {
        const allDrtItems = await sp.web.lists
            .getByTitle(dartDataList)
            .items.getAll();
        setallItemsDART(allDrtItems);

        return allDrtItems;
    };

    return {
        getAllDartListItems,
        allItemsDART,
        getAOCchoices,
        AOCChoiceArr,
        getMTFchoices,
        MTFChoiceArr,
        getMsnTypeChoices,
        MsnTypeArr,
        getStatusTypechoices,
        StatusArr,
        getRankChoices,
        rankChoiceArr,
    };
};
