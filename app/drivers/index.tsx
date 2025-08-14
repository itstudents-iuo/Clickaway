import { Redirect } from "expo-router";

export default function DriversIndex() {
    // Redirect to the default tab (dashboard)
    return <Redirect href="./drivers/tabs" />;
}
