/**
 * @preserve Copyright 2005-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

(function(Mibew, _){

    /**
     * @class Represents an agent
     */
    Mibew.Models.Agent = Mibew.Models.User.extend(
        /** @lends Mibew.Models.Agent.prototype */
        {
            /**
             * A list of default model values.
             * Inherits values from Mibew.Models.User
             * @type Object
             */
            defaults: _.extend(
                {},
                Mibew.Models.User.prototype.defaults,
                {
                    /**
                     * Agent id on the server
                     * @type Number
                     */
                    id: null,

                    /**
                     * Indicates that user is agent.
                     * Left only for compatibility with Mibew.Models.User
                     * @type Boolean
                     */
                    isAgent: true,

                    /**
                     * Indicates if agent away or available at the moment
                     * @type Boolean
                     */
                    away: false
                }
            ),

            /**
             * Set user status to 'away'
             * This is a shortcut for setAvailability method
             */
            away: function() {
                this.setAvailability(false);
            },

            /**
             * Set user status to 'available'
             * This is a shortcut for setAvailability method
             */
            available: function() {
                this.setAvailability(true);
            },

            /**
             * Set agent status: 'away' or 'available'
             * @param {Boolean} available true set agent's status to 'available'
             * and false set agent's status to 'away'
             */
            setAvailability: function(available) {
                var funcName = available?'available':'away';
                var self = this;
                Mibew.Objects.server.callFunctions(
                    [
                        {
                            'function': funcName,
                            'arguments': {
                                'agentId': this.id,
                                'references': {},
                                'return': {}
                            }
                        }
                    ],
                    function(args){
                        if (args.errorCode == 0) {
                            self.set({'away': !available});
                        }
                    },
                    true
                );
            }
        }
    );

})(Mibew, _);


