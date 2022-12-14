import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

export default ({ onPress, text }) => {
    return (
        <TouchableOpacity
            style={[styles.button]}
            onPress={onPress}
        >
            <Text style={[styles.text]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        borderRadius: 25,
        backgroundColor: Colors.darkGrey,
        height: 48,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    text: { color: "white", fontSize: 24, fontWeight: "bold" },
});