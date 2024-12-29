# NestJS
CRM complete.

## Deploy
[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=nestjs&repository=alexandrogds%2FNestJS&branch=start&instance_type=free&regions=was)

## Tests
A spec não apresenta erro quando a spec estiver imcompleta. Mas se começar apresentar erro então pode ser que a spec possa ser gerada automaticamente. Por isso dedicar uma atenção especial ao escrever a spec. Assim a spec deve ser escrita por uma pessoa de confiança do projeto para que trate corretamente o código. Por exemplo, `expect(result).toBe(mockMessage);` e `response.status(201).send() \n return this.appService.getHello();` valida que existe a resposta mas essa resposta nunca chega no browser.

## Learn
Parei na leitura e escuta da documentação em Controllers/Resources (https://docs.nestjs.com/controllers#resources).

## Dicionário
Handler: Manipulador; 

## Future
 - Fazer tests watchs com snapshots. Pesquisar no copilot Windows.

## Commands
```shell
nest g resource [name]
nest g controller [name]
```

## Codes
```ts
@HttpCode(NUMBER) // controllers decorators
getHello(@Next() _) // Method Controller Full; import Res from '@nestjs/common'
getHello(@Next() _, @Res({ passthrough: true }) res, @Req() req)  // My Controller Method Default
```

## Links
 - https://expressjs.com/en/api.html#req
 - https://docs.nestjs.com/custom-decorators

## Docs a entender

### Controllers

 - Usar o response do Express

 - - Texto da documentação

Podemos usar o objeto de resposta específico da biblioteca (por exemplo, Express), que pode ser injetado usando o decorador `@Res()` na assinatura do manipulador de método (por exemplo, `findAll(@Res() response)`). Com essa abordagem, você tem a capacidade de usar os métodos de manipulação de resposta nativos expostos por esse objeto. Por exemplo, com o Express, você pode construir respostas usando código como `response.status(200).send()`.

https://expressjs.com/en/api.html#res

 - - Codes 1

 - - - Controller
```ts
import { ..., Res } from '@nestjs/common';

...
  constructor(private readonly appService: AppService) {}
...
  getHello(@Res() response):...// esse response simula o res do Express
    response.status(200).send()
    return this.appService.getHello();// essa linha não executa #BUG do framework
...
```

 - - - Spec

```ts
...
    it('should return response with status 200 and return hello message', () => {
      const mockMessage = 'Hello World!';
      const dummyResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      jest.spyOn(appService, 'getHello').mockReturnValue(mockMessage);

      const result = appController.getHello(dummyResponse);

      expect(dummyResponse.status).toHaveBeenCalledWith(200);
      expect(dummyResponse.send).toHaveBeenCalled();
      expect(result).toBe(mockMessage);
...
```

 - - Codes 2

 - - - Controller

```ts
...
import { Response } from 'express';
...
  getHello(@Res() response: Response)...
    response.status(201).send()
...
```

 - - - Spec

```ts
...
      appController.getHello(dummyResponse as any);
...
```
