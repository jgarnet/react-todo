export default (data, headers) => {
    return jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => data,
            headers: headers || new Map()
        }),
    );
};
