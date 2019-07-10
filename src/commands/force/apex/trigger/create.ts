import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { CreateUtil } from '../../../../createUtil';
import ApexTriggerGenerator from '../../../../generators/apexTriggerGenerator';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('force-language-services', 'messages');
export default class ApexTrigger extends SfdxCommand {
  public static examples = [
    '$ sfdx force:apex:trigger:create -n MyTrigger',
    "$ sfdx force:apex:trigger:create -n MyTrigger -s Account -e 'before insert, after upsert'",
    '$ sfdx force:apex:trigger:create -n MyTrigger -d triggers'
  ];

  public static description = messages.getMessage(
    'ApexTriggerCommandDescription'
  );

  protected static flagsConfig = {
    outputdir: flags.string({
      char: 'd',
      description: messages.getMessage('outputdir'),
      required: false,
      default: process.cwd()
    }),
    // Need to fix the apiversion flag with default and optional inputs
    apiversion: flags.builtin(),
    triggerevents: flags.string({
      char: 'e',
      description: messages.getMessage('triggerevents'),
      default: 'before insert',
      options: [
        'before insert',
        'before update',
        'before delete',
        'after insert',
        'after update',
        'after delete',
        'after undelete'
      ]
    }),
    triggername: flags.string({
      char: 'n',
      description: messages.getMessage('triggername'),
      required: true
    }),
    sobject: flags.string({
      char: 's',
      description: messages.getMessage('sobject'),
      default: 'SOBJECT'
    }),
    template: flags.string({
      char: 't',
      description: messages.getMessage('template'),
      default: 'ApexTrigger',
      options: CreateUtil.getTemplates(/.trigger$/, 'apextrigger')
    })
  };

  public async run(): Promise<AnyJson> {
    CreateUtil.checkInputs(this.flags.triggername);
    CreateUtil.checkInputs(this.flags.template);

    this.log(CreateUtil.printOutputDir(this.flags.outputdir, process.cwd()));

    return CreateUtil.runGenerator(ApexTriggerGenerator, this.flags);
  }
}
