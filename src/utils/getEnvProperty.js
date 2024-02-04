const getEnvProperty = property => {
    return import.meta.env[property];
};

export default getEnvProperty;
