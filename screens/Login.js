import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Button from "../components/button";
import LabeledInput from "../components/LabledInput";
import Colors from "../constants/colors";
import validator from "validator";
import { auth } from "../constants/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../constants/firebaseConfig";






const validateFields = (email, password) => {
    const isValid = {
        email: validator.isEmail(email),
        password: validator.contains(password , "1")
    };

    return isValid;
};

const login = (email, password) => {


    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Logged in!");
        });
};

const createAccount = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            console.log("Creating user...");
            const userref = collection(db, "users");
            setDoc(doc(userref, user.uid), {});

        });
};

export default () => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [emailField, setEmailField] = useState({
        text: "",
        errorMessage: "",
    });
    const [passwordField, setPasswordField] = useState({
        text: "",
        errorMessage: "",
    });
    const [passwordReentryField, setPasswordReentryField] = useState({
        text: "",
        errorMessage: "",
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}> ToDo</Text>
            <View style={{ flex: 1 }}>
                <LabeledInput
                    label="Email"
                    text={emailField.text}
                    onChangeText={(text) => {
                        setEmailField({ text });
                    }}
                    errorMessage={emailField.errorMessage}
                    labelStyle={styles.label}
                    autoCompleteType="email"
                />
                <LabeledInput
                    label="Password"
                    text={passwordField.text}
                    onChangeText={(text) => {
                        setPasswordField({ text });
                    }}
                    secureTextEntry={true}
                    errorMessage={passwordField.errorMessage}
                    labelStyle={styles.label}
                    autoCompleteType="password"
                />
                {isCreateMode && (
                    <LabeledInput
                        label="Re-enter Password"
                        text={passwordReentryField.text}
                        onChangeText={(text) => {
                            setPasswordReentryField({ text });
                        }}
                        secureTextEntry={true}
                        errorMessage={passwordReentryField.errorMessage}
                        labelStyle={styles.label}
                    />
                )}
                <TouchableOpacity
                    onPress={() => {
                        setCreateMode(!isCreateMode);
                    }}
                >
                    <Text
                        style={{
                            alignSelf: "center",
                            color: Colors.blue,
                            fontSize: 16,
                            margin: 4,
                        }}
                    >
                        {isCreateMode
                            ? "Already have an account?"
                            : "Create new account"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Button
                onPress={() => {
                    const isValid = validateFields(
                        emailField.text,
                        passwordField.text
                    );
                    let isAllValid = true;
                    if (!isValid.email) {
                        emailField.errorMessage = "Please enter a valid email";
                        setEmailField({ ...emailField });
                        isAllValid = false;
                    }

                    if (!isValid.password) {
                        passwordField.errorMessage =
                            "Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters";
                        setPasswordField({ ...passwordField });
                        isAllValid = false;
                    }

                    if (
                        isCreateMode &&
                        passwordReentryField.text != passwordField.text
                    ) {
                        passwordReentryField.errorMessage =
                            "Passwords do not match";
                        setPasswordReentryField({ ...passwordReentryField });
                        isAllValid = false;
                    }

                    if (isAllValid) {
                        isCreateMode
                            ? createAccount(emailField.text, passwordField.text)
                            : login(emailField.text, passwordField.text);
                    }
                }}
                buttonStyle={{ backgroundColor: Colors.red }}
                text={isCreateMode ? "Create Account" : "Login"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "stretch",
    },
    label: { fontSize: 16, fontWeight: "bold", color: Colors.black },
    header: { fontSize: 35, color: Colors.orange, alignSelf: "center" },
});