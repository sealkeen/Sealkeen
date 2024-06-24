import { createInfoMessage } from '../Errors/fetch-errors.js';
import Exception from '../Extensions/cs-exception.js';

// Pre ES-6 DI container.js
function DIContainer() {
    this.services = {};
    this.resolvedDependencies = {}; // Cache for resolved dependencies
}

DIContainer.prototype.register = function(name, definition, dependencies) {
    this.services[name] = { definition: definition, dependencies: dependencies || [] };
};

DIContainer.prototype.resolve = function(name) {
    if (this.resolvedDependencies[name])
        return this.resolvedDependencies[name]; // Return cached instance if available
    var target = this.services[name];
    if (!target) Exception.Throw('Service ' + name + ' not found');
    
    var definition = target.definition;
    var dependencies = [];
    for (var i = 0; i < target.dependencies.length; i++) {
      dependencies.push(this.resolve(target.dependencies[i]));
    }
    var instance;
    if (typeof definition === 'function' && /^\s*class\s+/.test(definition.toString())) {
      // ES6 class
      instance = new definition(...dependencies);
    } else {
      // factory function
      instance = definition.apply(null, dependencies);
    }
    this.resolvedDependencies[name] = instance; // Cache
    createInfoMessage(`Resolved: "${name}"`)
    return instance;
};
  
export var serviceProvider = new DIContainer();