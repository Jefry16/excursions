var dbConfig = {
    synchronize: false,
  };
  /**
   * jefrycay_nest
   * .(fv5y]38D_3
   */
  switch (process.env.NODE_ENV) {
    case 'development':
      Object.assign(dbConfig, {
        type: 'mysql',
        username: 'root',
        password: '0.10.1mc',
        database: 'test',
        entities: ['**/*.entity.js'],
      });
      break;
    case 'test':
      Object.assign(dbConfig, {
        type: 'mysql',
        username: 'root',
        password: '0.10.1mc',
        database: 'test',
        entities: ['**/*.entity.ts'],
      });
      break;
    case 'production':
      break;
    default:
      throw new Error('unknown environment');
  }
  
  module.exports = dbConfig;
  