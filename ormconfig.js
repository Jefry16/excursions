var dbConfig = {
  synchronize: true,
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
      database: 'booking',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'mysql',
      username: 'root',
      password: '0.10.1mc',
      database: 'booking',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'mysql',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: ['**/*.entity.js'],
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
