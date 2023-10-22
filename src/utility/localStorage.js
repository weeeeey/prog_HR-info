import { reqData } from './api.js';

export const getHRdata = () => {
    return JSON.parse(window.localStorage.getItem('personalInfo'));
};

export const setHRdata = async () => {
    if (getHRdata()) return;
    try {
        const data = await reqData();
        window.localStorage.setItem('personalInfo', JSON.stringify(data));
        const cards = [];
        for (let i = 0; i < data.length; i++) {
            cards.push({
                idx: i,
                status: 'card',
            });
        }
        window.localStorage.setItem('cardStatus', JSON.stringify(cards));
    } catch (error) {
        throw new Error(error);
    }
};

export const getCardStatusData = () => {
    return JSON.parse(window.localStorage.getItem('cardStatus'));
};

export const setCardStatusData = (idx) => {
    const oldData = getCardStatusData();
    if (!oldData) return;
    oldData[idx].status =
        oldData[idx].status === 'card' ? 'card is-flipped' : 'card';
    window.localStorage.setItem('cardStatus', JSON.stringify(oldData));
};

export const handleSignUp = (data) => {
    const { email, nickname } = data;
    const localDatas = JSON.parse(window.localStorage.getItem('sign'));
    if (!localDatas) {
        window.localStorage.setItem('sign', JSON.stringify([data]));
        alert('성공적으로 등록되었습니다.');
        return true;
    }
    const bool = localDatas.some(
        (localData) =>
            localData.email === email || localData.nickname === nickname
    );

    if (bool) {
        alert('이메일 혹은 닉네임이 이미 등록되어 있습니다.');
        return false;
    } else {
        window.localStorage.setItem(
            'sign',
            JSON.stringify([...localDatas, data])
        );
        alert('성공적으로 등록되었습니다.');
        return true;
    }
};
