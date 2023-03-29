import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item }) => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState("");

  const handleCardPress = (item) => {
    // setSelectedJob(item?.job_id);
    router.push(`job-details/${item?.job_id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => {
        handleCardPress(item);
      }}
    >
      <View style={styles.jobTypeAndLogo}>
        <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
          <Image
            source={{
              uri:
                item.employer_logo ||
                "https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <Text style={styles.jobType} numberOfLines={1}>
          {item.job_employment_type}
        </Text>
      </View>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item?.job_title}
        </Text>
        <Text style={styles.location}>
          {item?.job_country}
          {item?.job_city && `, ${item?.job_city}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
