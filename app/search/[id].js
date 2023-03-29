import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import styles from "./search.style";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { NearbyJobCard, ScreenHeaderBtn } from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const SearchResult = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState(params?.id);
  const { isLoading, error, data, refetch } = useFetch("search", {
    query: params?.id,
    page: "1",
    num_pages: "1",
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "Search",
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
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
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChange={(text) => {
                  setSearchTerm(text);
                }}
                placeholder="What are you looking for?"
              />
            </View>

            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => {
                if (searchTerm) {
                  refetch();
                  router.push(`/search/${searchTerm}`);
                }
              }}
            >
              <Image
                source={icons.search}
                resizeMode="contain"
                style={styles.searchBtnImage}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: SIZES.medium,
              gap: SIZES.small,
              padding: SIZES.small,
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              data.map((job) => (
                <NearbyJobCard
                  job={job}
                  key={`search-jobs-${job?.job_id}`}
                  handleNavigate={() =>
                    router.push(`job-details/${job?.job_id}`)
                  }
                />
              ))
            )}
            {error && !isLoading && <Text>Something went wrong</Text>}
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};
export default SearchResult;
