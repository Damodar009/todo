import React from "react";
import { View } from "react-native";
import Button from "../components/button";
import {auth} from "../constants/firebaseConfig" ;
import {signOut} from "firebase/auth" ;


export default () => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Button
                text="Log out"
                onPress={() => {
                    signOut(auth);
                }}
            />
        </View>
    );
};