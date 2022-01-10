import { flags } from '@adonisjs/core/build/standalone'
import MigrationsBase from './Base'

/**
 * This command reset the database by rolling back to batch 0
 */
export default class Reset extends MigrationsBase {
  public static commandName = 'migration:reset'
  public static description = 'Reset migrations to initial state'

  /**
   * Custom connection for running migrations.
   */
  @flags.string({ description: 'Define a custom database connection', alias: 'c' })
  public connection: string

  /**
   * Force run migrations in production
   */
  @flags.boolean({ description: 'Explicitly force to run migrations in production' })
  public force: boolean = false

  /**
   * Perform dry run
   */
  @flags.boolean({ description: 'Print SQL queries, instead of running the migrations' })
  public dryRun: boolean = false

  /**
   * This command loads the application, since we need the runtime
   * to find the migration directories for a given connection
   */
  public static settings = {
    loadApp: true,
  }

  /**
   * Handle command
   */
  public async run(): Promise<void> {
    const db = this.application.container.use('Adonis/Lucid/Database')
    this.connection = this.connection || db.primaryConnectionName

    await this.kernel.exec(`migration:rollback`, [
      '--batch=0',
      `--connection=${this.connection}`,
      `--force=${this.force}`,
      `--dry-run=${this.dryRun}`,
    ])
  }
}
