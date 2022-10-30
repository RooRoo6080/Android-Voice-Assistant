import React from "react";
import { useState } from "react";
import { Text, Dimensions, View, Image } from "react-native";
import {
  Card,
  TextInput,
  Text as Typography,
  Button,
} from "react-native-paper";
import AppIntroSlider from "react-native-app-intro-slider";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import { useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import BirthdayPicker from "../components/BirthdayPicker";

const vw = Dimensions.get("window").width;
const vh = Dimensions.get("window").height;

WebBrowser.maybeCompleteAuthSession();

const Home = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "907764184094-v1j93vu84708ql55udov2iujrdgjjm96.apps.googleusercontent.com",
  });
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCreate = () => {
    // db.collection("users")
    navigation.navigate('Bot')
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = firebase.auth();
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      auth.signInWithCredential(credential);

      firebase.auth().onAuthStateChanged((user1) => {
        if (user1) {
          setLoggedIn(true);
          setUser(user1);
          db.collection("users").doc(user1.uid).set({
            name: user1.displayName,
            photoURL: user1.photoURL,
            email: user1.email,
            uid: user1.uid,
          });
        } else {
          setLoggedIn(false);
        }
      });
    }
    firebase.auth().onAuthStateChanged((user1) => {
      if (user1) {
        setLoggedIn(true);
        setUser(user1);
        db.collection("users").doc(user1.uid).set({
          name: user1.displayName,
          photoURL: user1.photoURL,
          email: user1.email,
          uid: user1.uid,
        });
      } else {
        setLoggedIn(false);
      }
    });
  }, [response]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: "#121212", height: vh }}>
        <Card
          style={{
            height: 0.93 * vh,
            alignSelf: "center",
            width: 0.9 * vw,
            marginTop: 0.05 * vh,
            padding: 20,
            backgroundColor: "#1a1919",
            color: "white",
            alignText: "center",
          }}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
            }}
            style={{ width: 150, height: 150, alignSelf: "center" }}
          />
          <Typography
            variant="displaySmall"
            style={{
              color: "white",
              alignSelf: "center",
              marginTop: 0.1 * vh,
              textAlign: "center",
            }}
          >
            {item.title}
          </Typography>
          {/* <Typography
            variant="displaySmall"
            style={{ color: "white", alignSelf: "center" }}
          >
            T!na
          </Typography> */}
          <Typography
            variant="titleLarge"
            style={{
              color: "white",
              alignSelf: "center",
              marginTop: 0.1 * vh,
              width: 350,
              textAlign: "center",
            }}
          >
            {item.text}
          </Typography>
          {item.key == 5 && (
            <>
              <Button
                mode="outlined"
                style={{
                  backgroundColor: "#137000",
                  borderWidth: 0,
                  marginTop: 0.11 * vh,
                }}
                textColor="white"
                onPress={() => promptAsync()}
              >
                Get Started
              </Button>
              <Button
                mode="outlined"
                style={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  marginTop: 0.02 * vh,
                }}
                textColor="#137000"
              >
                Login
              </Button>
            </>
          )}
        </Card>
      </View>
    );
  };
  const onDone = () => {
    navigation.navigate("");
  };

  const slides = [
    {
      key: 1,
      title: "Welcome To T!na",
      text: "The newest to find, make, and save friends",
      image: require("../images/T!na.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: "Have An Assistant",
      text: "Someone to talk to, whether it's for help or just for fun",
      image: require("../assets/favicon.png"),
      backgroundColor: "#febe29",
    },
    {
      key: 3,
      title: "Find Similar People",
      text: "Allow the assistant to log your conversations to find peopel with similar interests",
      image: require("../assets/favicon.png"),
      backgroundColor: "#22bcb5",
    },
    {
      key: 4,
      title: "Connect With Friends Or Make More",
      text: "Start a conversation with your friends and those recommended to you",
      image: require("../assets/favicon.png"),
      backgroundColor: "#22bcb5",
    },
    {
      key: 5,
      title: "Start. Anytime. Anywhere.",
      text: "Join us at T!na and start immediately",
      image: require("../assets/favicon.png"),
      backgroundColor: "#22bcb5",
    },
  ];
  return (
    <>
      {!loggedIn ? (
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          showDoneButton={false}
          showPrevButton={true}
        />
      ) : (
        <View style={{ backgroundColor: "#121212", height: vh }}>
          <Card
            style={{
              height: 0.93 * vh,
              alignSelf: "center",
              width: 0.9 * vw,
              marginTop: 0.05 * vh,
              padding: 20,
              backgroundColor: "#1a1919",
              color: "white",
              alignText: "center",
            }}
          >
            <Typography
              variant="displaySmall"
              style={{
                color: "white",
                alignSelf: "center",
                marginTop: 0.1 * vh,
                textAlign: "center",
              }}
            >
              Create Your Profile
            </Typography>
            <TextInput
              style={{
                backgroundColor: "#1a1919",
                borderColor: "white",
                color: "white",
                marginTop: 0.05 * vh,
              }}
              placeholder="Steven"
              outlineColor="white"
              activeOutlineColor="white"
              textColor="white"
              label="First Name"
              activeUnderlineColor="#1a1919"
              underlineColor="#1a1919"
              mode="outlined"
            />
            <TextInput
              style={{
                backgroundColor: "#1a1919",
                borderColor: "white",
                color: "white",
                marginTop: 0.05 * vh,
              }}
              placeholder="Smith"
              outlineColor="white"
              activeOutlineColor="white"
              label="Last Name"
              textColor="white"
              mode="outlined"
              activeUnderlineColor="#1a1919"
              underlineColor="#1a1919"
            />

            <TextInput
              style={{
                backgroundColor: "#1a1919",
                borderColor: "white",
                color: "white",
                marginTop: 0.05 * vh,
              }}
              placeholder="13"
              outlineColor="white"
              activeOutlineColor="white"
              textColor="white"
              label="Your Age"
              mode="outlined"
              activeUnderlineColor="#1a1919"
              underlineColor="#1a1919"
            />
            <Button
              mode="outlined"
              style={{
                backgroundColor: "#137000",
                borderWidth: 0,
                marginTop: 0.11 * vh,
              }}
              textColor="white"
              onPress={handleCreate}
            >
              Create
            </Button>
          </Card>
        </View>
      )}
    </>
  );
};

export default Home;
