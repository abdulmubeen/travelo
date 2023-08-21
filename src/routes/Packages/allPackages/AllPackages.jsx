import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Container } from "@mantine/core";
import PackageCard from "../../../components/Package/PackageCard/PackageCard";
import SearchBar from "../../../components/Package/SearchBar/SearchBar";

const AllPackages = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const { allPacks } = useSelector((state) => state.allpacks);
  const allPackages = Object.values(allPacks);

  const filterPackages = (text) => {
    const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
    return allPackages.filter(
      (item) =>
        regex.test(item.packageName) ||
        regex.test(item.packagePrice) ||
        regex.test(item.stayDetails) ||
        regex.test(item.activities) ||
        regex.test(item.country)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPacks = filterPackages(e.target.value);
        setFilteredPackages(filteredPacks);
      }, 500)
    );
  };
  return (
    <Container size={"xl"}>
      <SearchBar onChange={handleSearchChange} value={searchText} />
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} p={35}>
        {searchText ? (
          <>
            {filteredPackages.map(
              ({
                packageName,
                packageDuration,
                flightDetails,
                country,
                stayDetails,
                activities,
                packagePrice,
                packageId,
                packageImage,
              }) => (
                <Grid.Col lg={3} md={4} sm={5} key={packageId}>
                  <PackageCard
                    packageId={packageId}
                    packageDuration={packageDuration}
                    packageName={packageName}
                    flightDetails={flightDetails}
                    country={country}
                    stayDetails={stayDetails}
                    activities={activities}
                    packagePrice={packagePrice}
                    packageImage={packageImage}
                  />
                </Grid.Col>
              )
            )}
          </>
        ) : (
          <>
            {allPackages.map(
              ({
                packageName,
                packageDuration,
                flightDetails,
                country,
                stayDetails,
                activities,
                packagePrice,
                packageId,
                packageImage,
              }) => (
                <Grid.Col lg={3} md={4} sm={5} key={packageId}>
                  <PackageCard
                    packageId={packageId}
                    packageDuration={packageDuration}
                    packageName={packageName}
                    flightDetails={flightDetails}
                    country={country}
                    stayDetails={stayDetails}
                    activities={activities}
                    packagePrice={packagePrice}
                    packageImage={packageImage}
                  />
                </Grid.Col>
              )
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default AllPackages;
