import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import OpenAI from 'openai';

@Injectable()
export class ChatGPTService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly openai = new OpenAI();

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/engines/curie/completions';
  }

  generateResponse(prompt: string): Observable<AxiosResponse> {
    const data = {
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
    return this.httpService.post(this.apiUrl, data, { headers: headers });
  }

  async generateResponseSecond(): Promise<any> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-3.5-turbo',
    });

    console.log(completion.choices[0]);
  }
}
