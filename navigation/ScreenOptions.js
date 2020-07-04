import React from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MenuButton from "../components/MenuButton";
import AvatarButton from "../components/AvatarButton";

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.name,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={MenuButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <AvatarButton
        handleClick={() => {
          navData.navigation.navigate({
            name: "My Account",
            params: {},
          });
        }}
      />
    ),
  };
};
