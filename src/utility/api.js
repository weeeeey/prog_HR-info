const API_END_POINT = './src/data/new_data.json';

export const reqData = async () => {
    try {
        const data = await fetch(API_END_POINT);
        return data.json();
    } catch (error) {
        throw new Error(error);
    }
};
