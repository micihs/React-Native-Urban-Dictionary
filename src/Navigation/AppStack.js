import React, { Component } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import WordFeed from './app/components/words';
import Search from './app/components/search';
import MainScreen from "../assets/components/MainScreen";

const Stack = createStackNavigator();

function RenderWordFeed(title, feedURL, onBack) {
    return (
        <WordFeed
            title={title}
            feedURL={feedURL}
            onBack={onBack}
        />
    );
};

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                Component={MainScreen}
            />
            <Stack.Screen
                name="WotD"
                Component={RenderWordFeed}
            />
            <Stack.Screen
                name="WotD_2"
                Component={RenderWordFeed}
            />
            <Stack.Screen
                name="Random"
                Component={RenderWordFeed}        
            />
            <Stack.Screen
                name="Search"
                Component={Search}
            />
        </Stack.Navigator>
    );
};