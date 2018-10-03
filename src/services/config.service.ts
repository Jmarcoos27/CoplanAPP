export class ConfigService{
  private urlService:string
  constructor(){
    this.urlService = 'http://localhost:8090/coplan-0.0.1-SNAPSHOT/service';
  }
  getUrlService(): string{
    return this.urlService;
  }
}
