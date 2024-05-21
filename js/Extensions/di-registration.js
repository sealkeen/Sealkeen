import { serviceProvider } from '../Services/di-container.js';
import MusicAPI from '../Page/url-decoding.js';

export function registerDependencies() {
    //serviceProvider.register();
    serviceProvider.register('musicApi', MusicAPI, []);
}

function Example() {
    // Registration
    serviceProvider.register('logger', Logger, []);
    serviceProvider.register('config', function() { return { apiUrl: 'https://api.example.com', apiKey: '12345' }; }, []);
    serviceProvider.register('userService', UserService, ['logger', 'config']);

    // Resolution
    var userService1 = serviceProvider.resolve('userService');
    var userService2 = serviceProvider.resolve('userService');

    console.log(userService1 === userService2); // Output: true, both instances are the same

    // main.js

    // Assuming the following imports if using a module bundler, otherwise include these in <script> tags in your HTML
    // import { serviceProvider } from './serviceProvider.js';
    // import { Logger } from './logger.js';
    // import { UserService } from './userService.js';
    // import { config } from './config.js';
}