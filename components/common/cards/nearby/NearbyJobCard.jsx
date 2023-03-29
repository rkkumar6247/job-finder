import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri:
              job?.employer_logo ||
              "https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title}
        </Text>
        <Text style={styles.jobType}>{job?.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
