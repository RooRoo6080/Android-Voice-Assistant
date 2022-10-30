import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Card, Text as Typography } from "react-native-paper";
import { db } from "../firebase";

const Similar = () => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    db.collection("similar")
      .doc("xYQDm8nNCeN6RfQIc0IMdjJs3e53")
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          db.collection("similar")
            .doc("xYQDm8nNCeN6RfQIc0IMdjJs3e53")
            .onSnapshot((doc) => {
            setSimilar(oldArray => [...oldArray, doc.data()]);
            });
        }
      });
  }, []);

  return (
    <View>
      <Card>
        {similar.map((m) => {
            <View>
                <Typography>{m.math}</Typography>
            </View>
        })}
      </Card>
    </View>
  );
};

export default Similar;
