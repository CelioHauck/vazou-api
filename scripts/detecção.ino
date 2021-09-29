#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Moto";
const char* password = "12345678";
const char* serverName = "https://vazou-api.herokuapp.com/metrics";
#define MQ2 34
#define buzzer 18
int sensorValue = 0;


void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  pinMode(MQ2, INPUT);
  pinMode(buzzer, OUTPUT);

  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  sensorValue = analogRead(MQ2);
  Serial.println(sensorValue);
  if (sensorValue != 4095) {
    Serial.println("Valor detectado");

    if (WiFi.status() == WL_CONNECTED) {

      if (sensorValue < 600) {
        delay(200);
        digitalWrite(buzzer, HIGH);
        delay(200);
      } else {
        delay(200);
        digitalWrite(buzzer, LOW);
        delay(200);
      }

      HTTPClient http;

      http.begin(serverName);
      Serial.println("Enviando valor para metrica");

      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String value = "value=";
      String httpRequestData = value + sensorValue;
      Serial.println(httpRequestData);
      int httpResponseCode = http.POST(httpRequestData);

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);

      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
}
