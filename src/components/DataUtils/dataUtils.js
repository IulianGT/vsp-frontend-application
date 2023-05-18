import axios from "axios";

export const fetchData = async () => {
	try {
		const currentDate = new Date().toISOString().slice(0, 10);
		//console.log("CD " + currentDate);

		const storedCurrenciesData =
			JSON.parse(localStorage.getItem("currencyData")) || {};

		if (storedCurrenciesData[currentDate]) {
			return storedCurrenciesData[currentDate];
		}

		const response = await axios.get(
			"https://victorysquarepartners.com/curs1.php",
			{
				responseType: "document",
			}
		);

		const xmlData = response.data;
		const xmlDataAsString = new XMLSerializer().serializeToString(xmlData);

		storedCurrenciesData[currentDate] = xmlDataAsString;
		localStorage.setItem("currencyData", JSON.stringify(storedCurrenciesData));

		return xmlDataAsString;
	} catch (error) {
		console.error(error);
		return null;
	}
};
