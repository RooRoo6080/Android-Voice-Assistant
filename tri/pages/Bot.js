import { Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Similar from "./Similar";
import Profile from "./Profile";

const Tab = createMaterialBottomTabNavigator();

const Bot = () => {
  return (
    <Tab.Navigator
      initialRouteName="Suggested"
      activeColor="black"
      inactiveColor="white"
      barStyle={{ backgroundColor: "#137000" }}
    >
      <Tab.Screen
        name="Suggested"
        component={Similar}
        tabBarIcon={{ color: "white" }}
        options={{
          tabBarLabel: "Suggested",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        tabBarIcon={{ color: "white" }}
        options={{
          tabBarLabel: "Suggested",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cellphone-settings"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
};

export default Bot;
