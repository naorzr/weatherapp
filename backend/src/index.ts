import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastify, { FastifyInstance } from 'fastify';
import * as H from './clients/History';
import { WeatherService } from './clients/WeatherClient';

dotenv.config();

const server: FastifyInstance = fastify({ logger: true });
server.register(cors, { origin: '*' });

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  throw new Error('WEATHER_API_KEY not found');
}

const weatherService = new WeatherService(WEATHER_API_KEY);

interface IQueryParams {
  cities: string;
}

server.get('/api/weather', async (request, reply) => {
  const cities = (request.query as IQueryParams)?.cities?.split(',');
  if (!cities) {
    reply.code(400).send({ error: 'cities query parameter is required' });
    return;
  }
  const weatherData = await weatherService.getWeatherData(cities);
  H.addToHistory('weather', JSON.stringify(weatherData));
  reply.send(weatherData);
});

server.get('/api/history', async (_request, reply) => {
  console.log('getRecentHistory getRecentHistory getRecentHistory getRecentHistory ', H, H.addToHistory)
  const recentHistory = await H.getRecentHistory(10)
  reply.send(recentHistory.map((h) => ({
    ...h,
    data: JSON.parse(h.data),
  })));
});


const start = async () => {
  try {
    await server.listen({ port: 3000 });
    server.log.info(`server listening on ${server.server.address()}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
