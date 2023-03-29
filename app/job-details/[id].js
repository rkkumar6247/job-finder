import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsbilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { isLoading, error, data, refetch } = useFetch("job-details", {
    job_id: params?.id,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout
            title="About the job"
            info={data[0]?.job_description ?? "No data provided"}
          />
        );
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "Responsbilities":
        return (
          <Specifics
            title="Responsbilities"
            points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "Job details",
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading && !data[0] ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View
              style={{ flex: 1, padding: SIZES.medium, paddingBottom: 100 }}
            >
              <Company
                companyLogo={data[0]?.employer_logo}
                jobTitle={data[0]?.job_title}
                companyName={data[0]?.employer_name}
                location={data[0]?.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
          {error && !isLoading && (
            <Text style={{ padding: SIZES.medium }}>Something went wrong</Text>
          )}
        </ScrollView>
        {!isLoading && data[0] && (
          <JobFooter
            url={
              data[0]?.job_google_link ??
              "https://careers.google.com/jobs/results"
            }
          />
        )}
      </>
    </SafeAreaView>
  );
};
export default JobDetails;
