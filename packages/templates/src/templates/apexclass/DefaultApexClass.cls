public with sharing class <%= apiName %> {
    		public <%= apiName %>(String prop) {
			this.prop = prop;
    		}

		@AuraEnabled public String prop { get;set; }
	}