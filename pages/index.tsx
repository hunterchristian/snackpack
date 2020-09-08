import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { GetServerSideProps } from "next";
import React from "react";

const useStyles = makeStyles(() => ({
  container: { justifyContent: "center" },
  transactions: {},
}));

function Home() {
  const classes = useStyles();
  // useEffect(() => {
  // Any data that can only be loaded on the client can
  // be fetched with axios once the page mounts
  // axios.get("/api/your-data").then();
  // }, []);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={6}>
        Load items into a grid
      </Grid>
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Load some initial server side properties here
  return { props: {} };
};

export default Home;
