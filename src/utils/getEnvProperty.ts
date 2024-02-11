const getEnvProperty = (property: string) => {
    return import.meta.env[property];
};

export default getEnvProperty;
