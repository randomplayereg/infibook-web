import React from 'react';

export const language = {
    en: {
        kappa: "Kappa 123",
        home: "Home",
        library: "Library",
        transaction: "Transaction",
        setting: "Setting",
        edit_profile: "Edit Profile",
        edit_location: "Edit Location",
        change_password: "Change Password"
    },
    vi: {
        kappa: "4Head"
    },
};

export const Ruben = React.createContext(
    language.en // default value
);