import axios from 'axios';

interface kakaotalkArgs {
  weather: {
    cod: number;
    weather: string;
    temp: string;
  };
  news: string;
  date: string;

  url: string;
}

export default async({ weather, news, date, url }: kakaotalkArgs) => {
  const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');

  let message: any = {
    messages: []
  };
  
  let weatherMsg = "";
  if(weather.cod != 200)
    weatherMsg = "날씨를 이용할 수 없습니다.";
  else
    weatherMsg = "날짜 / 한국\n" + `${today} ${date ? '(' + date + ')' : ''}` + 
    "\n\n날씨 / 성남\n" + weather.weather +
    "\n\n온도 / 성남\n" + weather.temp;

  message.messages.push({
    message: weatherMsg,
    target_db_table: "",
    target_db_data_type: "",

    // fields: [
    //   {
    //     name: '📅 날짜 / 한국',
    //     value: `${today} ${date ? '(' + date + ')' : ''}`,
    //     inline: true
    //   },
    //   {
    //     name: '🏞️ 날씨 / 부산',
    //     value: weather.weather,
    //     inline: true
    //   },
    //   {
    //     name: '🌡 온도 / 부산',
    //     value: weather.temp,
    //     inline: true
    //   }
    // ],
  });

//   await axios({
//     method: 'post',
//     url: url,
//     headers: {
//         'Content-Type': 'application/text'
//     },
//     data: JSON.stringify(message) + "\r\n",
//     timeout: 2000
// }).catch(function(e) { });
  await axios.post(url, JSON.stringify(message) + "\r\n")
    .catch(function(e) {
      // retry
      if(e.response.status === 503) {
        console.log("retrying...");
        axios.post(url, JSON.stringify(message) + "\r\n")
      }
    });
};
