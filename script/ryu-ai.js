var CreateRyuAI = function(player)
{
    //*****************************************************
    //******************  PRIVATE STATE    ****************
    //*****************************************************

    var FLAGS =  {
        DONE: 1 << 1
        ,MOVE_TO_ENEMY: 1 << 2
        ,MOBILE_ME: 1 << 3
        ,GROUNDED_ENEMY: 1 << 4
        ,CLEAR_INPUT: 1 << 5
        ,CLEAR_OTHER_INPUT: 1 << 6
        ,RESET: 1 << 7
        ,JUMP_IN: 1 << 8
        ,CANCEL_IF_ANIMATION_CHANGED: 1 << 9
        ,ROLL_TO_ENEMY: 1 << 10
    };

    //private member
    var lightSuperFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:16} ];
    var mediumSuperFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:32} ];
    var hardSuperFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:64} ];

    //private member
    var lightFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:16} ];
    var mediumFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:32} ];
    var hardFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:64} ];

    //private member
    var lightSKickInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.LIGHT_KICK} ];
    var mediumSKickInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.MEDIUM_KICK} ];
    var hardSKickInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.HARD_KICK} ];

    var hardRollInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.HARD_PUNCH} ];
    var mediumRollInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ];
    var lightRollInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ];

    //private member
    var lightUppercutInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:16} ];
    var mediumUppercutInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:32} ];
    var hardUppercutInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:64} ];

    var kicks_ = [ [ {IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var punches_ = [ [ {IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.HARD_PUNCH} ], [ {IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ];
    var lowKicks_ = [ [ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var lowPunches_ = [ [ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.HARD_PUNCH} ] ];
    var jump_ = [ {IsDown:true,Button:BUTTONS.JUMP} ];
    var jumpInInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var jumpOutInput_ = [ {IsDown:true,Button:BUTTONS.BACK}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var crouch_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ];

    var blockInput_ = [{IsDown:true,Button:BUTTONS.BACK}];
    var stopBlockInput_ = [{IsDown:false,Button:BUTTONS.BACK}];

    var fwd_ = [{IsDown:true,Button:BUTTONS.FORWARD}];
    var bk_ = [{IsDown:true,Button:BUTTONS.BACK}];

    var throwInput1_ = [{IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.HARD_PUNCH}];
    var throwInput2_ = [{IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.HARD_KICK}];

    ////////////////////////




    //*****************************************************
    //******************  PUBLIC  STATE    ****************
    //*****************************************************


    //
    var RyuAI = function()
    {
        this.AI = CreateGenericAI(player);
        this.initCombos();
    }

    RyuAI.prototype.initCombos = function()
    {
        this.AI.SingleMoves = {
            "u1" : [{A:0, B:"u1"}]
            ,"u2" : [{A:0, B:"u2"}]
            ,"u3" : [{A:0, B:"u3"}]
            ,"lp3" : [{A:0, B:"lp3"}]
            ,"p1" : [{A:0, B:"p1"}]
            ,"p2" : [{A:0, B:"p2"}]
            ,"p3" : [{A:0, B:"p3"}]
            ,"k1" : [{A:0, B:"k1"}]
            ,"k2" : [{A:0, B:"k2"}]
            ,"k3" : [{A:0, B:"k3"}]
        };

        this.AI.VeryCloseCombos = [
             [{A:0,B:"get_close", C:CONSTANTS.GRAPPLE_DISTANCE,D:-999}, {A:0,B:"t1"}]
            ,[{A:0,B:"get_close", C:CONSTANTS.GRAPPLE_DISTANCE,D:-999}, {A:0,B:"t2"}]
            ,[{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"p3"}, {A:5,B:"fb1"}]
            ,[{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"p3"}, {A:5,B:"fb1"}]
            ,[{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"p3"}, {A:5,B:"fb1"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:10,B:"lk3"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:11,B:"lk2"}, {A:10,B:"lk3"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:5,B:"lk2"}, {A:11,B:"k2"}, {A:10,B:"fb1"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:11,B:"lk2"}, {A:25,B:"fb1"}]
            ,[{A:0,B:"get_close", C:60,D:-999}, {A:0,B:"p3"},{A:9,B:"u3"}]
            ,[{A:0,B:"get_close", C:60,D:-999}, {A:0,B:"p3"},{A:9,B:"fb1"}]
            ,[{A:0,B:"get_close", C:60,D:-999}, {A:0,B:"p3"},{A:9,B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"p1"}, {A:4, B:"p3"}, {A:19, B:"p1"}, {A:15, B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"p3"}, {A:5, B:"p1"}, {A:15, B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k3"}, {A:4, B:"p3"}, {A:4, B:"u3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"p1"}, {A:4, B:"p2"}, {A:13, B:"k2"}, {A:17, B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"lk2"}, {A:8, B:"k2"}, {A:13, B:"p1"}, {A:17, B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:4,B:"p1"},{A:14,B:"p3"}, {A:18,B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2"}, {A:25, B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2"}, {A:25, B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2"}, {A:25, B:"u1"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2"}, {A:25, B:"fb1"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"lp3"}, {A:4, B:"u3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"lp3"}, {A:4, B:"fb1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p3"}, {A:5,B:"lp3"}, {A:19,B:"p3"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"k1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"k1"},{A:10,B:"fb1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"lk2"},{A:16,B:"fb1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"lp3"}, {A:4,B:"p2"},{A:9,B:"u1"}]
            ,[this.AI.GET_REAL_CLOSE, {A:0,B:"p2"}, {A:3,B:"p1"}, {A:15,B:"k2"}, {A:29,B:"k3"}]
            ];
        this.AI.CloseCombos = [
             [{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2"}]
            ,[{A:0,B:"get_close", C:100,D:-999}, {A:0,B:"lk2"}, {A:0,B:"u1"}]
            ,[{A:0,B:"get_close", C:95,D:-999}, {A:0,B:"lk3"}]
            ,[{A:0,B:"get_close", C:185,D:-999}, {A:0,B:"k3"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2"}, {A:4,B:"fb1"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2"}, {A:4,B:"hk3"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2"}, {A:4,B:"fb1"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2"}, {A:4,B:"fb3"}]
            ,[{A:0,B:"get_close", C:100,D:-999}, {A:0,B:"lk2"}, {A:8,B:"lk3"}]
            ,[{A:0,B:"get_close", C:100,D:-999}, {A:0,B:"lk2"}, {A:8,B:"lk3"}, {A:4,B:"sb3"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"k1"}, {A:5,B:"fb1"}]
            ,[{A:0,B:"get_close", C:150,D:-999}, {A:0,B:"k2"}, {A:9,B:"k3"}]
            ,[{A:0,B:"get_close", C:130,D:-999}, {A:0,B:"k2"}, {A:5,B:"k3"}, {A:21,B:"fb3"}]
            ,[{A:0,B:"get_close", C:185,D:-999}, {A:0,B:"k3"}, {A:7,B:"fb3"}]
        ];

        this.AI.CounterProjectileCombos = [
            [{A:5, B:"fj"}, {A:28, B:"k3"}, {A:23,B:"k2"}, {A:14,B:"p2"}, {A:15,B:"sfb3"}]
            ,[{A:5, B:"fj"}, {A:27, B:"k3"}, {A:23,B:"k2"}, {A:24,B:"lk3"}]
            ,[{A:5, B:"fj"}, {A:27, B:"k3"}, {A:21,B:"lk3"}]
            ,[{A:2, B:"fj"}, {A:5, B:"hk3"}]
            ,[{A:2, B:"fj"}, {A:5, B:"hk2"}]
        ];

        this.AI.JumpInCombos = [
            [{A:5, B:"jump_in", C:100,D:-999}, {A:35, B:"k3"}, {A:20, B:"lk3"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:35, B:"k3"}, {A:20, B:"lk2"}, {A:14, B:"lk3"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:30, B:"fp2"}, {A:36, B:"lk2"}, {A:14, B:"hk3"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:30, B:"fp2"}, {A:36, B:"lk2"}, {A:14, B:"u3"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:30, B:"fp2"}, {A:36, B:"lk2"}, {A:14, B:"fb1"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:33, B:"k3"}, {A:20, B:"u1"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:20, B:"hk3"}]
            /*cross up*/
            ,[{A:5,B:"jump_in", C:-10,D:-999}, {A:30,B:"k2"}, {A:32, B:"k2"}, {A:24,B:"lk3"}]
            ,[{A:5,B:"jump_in", C:-10,D:-999}, {A:30,B:"k2"}, {A:28, B:"k3"}, {A:12,B:"u3"}]
            ,[{A:5,B:"jump_in", C:-10,D:-999}, {A:30,B:"k2"}, {A:28, B:"k3"}, {A:12,B:"fb1"}]
            ,[{A:5,B:"jump_in", C:-10,D:-999}, {A:30,B:"k2"}, {A:28, B:"k3"}, {A:12,B:"hk3"}]
            ,[{A:5,B:"jump_in", C:-10,D:-999}, {A:30,B:"k2"}, {A:28, B:"k3"}, {A:12,B:"lk3"}]
            ,[{A:5,B:"jump_in", C:-10,D:-999}, {A:30,B:"k2"}, {A:28, B:"k3"}, {A:11,B:"lk1"}, {A:18,B:"lk3"}]
        ];
    }



    RyuAI.prototype.throwSuperFireball = function(forced)
    {
        var energyLevel = this.AI.Player.getEnergyLevel();
        if(energyLevel > 0)
        {
            if((getRand() > 50) || !!forced)
            {
                var which = Math.floor(Math.random() * energyLevel) + 1
                switch(which)
                {
                    case ENERGYBAR.LEVELMAXED: this.reset(); this.AI.Player.sendInput(hardSuperFireballInput_); break;
                    case ENERGYBAR.LEVEL2: this.reset(); this.AI.Player.sendInput(mediumSuperFireballInput_); break;
                    case ENERGYBAR.LEVEL1: this.reset(); this.AI.Player.sendInput(lightSuperFireballInput_); break;
                    default: return false;
                }
                
                this.AI.sendInput(FLAGS.CLEAR_INPUT,10);
                return true;
            }
        }
        return false;
    }

    RyuAI.prototype.getForwardKey = function() {this.AI.Player.MustChangeDirection ? BUTTONS.BACK : BUTTONS.FORWARD;}
    RyuAI.prototype.wanderForward = function(nbFrames) { this.AI.Actions.push(this.AI.createAction(0,null,fwd_)); this.AI.Actions.push(this.AI.createAction(nbFrames,FLAGS.CLEAR_INPUT)); }
    RyuAI.prototype.wanderBackward = function(nbFrames) { this.AI.Actions.push(this.AI.createAction(0,null,bk_)); this.AI.Actions.push(this.AI.createAction(nbFrames,FLAGS.CLEAR_INPUT)); }

    RyuAI.prototype.executeThrow = function(which,igoreMoveToEnemy)
    {
        if(!igoreMoveToEnemy)
            this.AI.moveToEnemy();
        this.AI.Actions.push(this.AI.createAction(0,null,fwd_));
        if(!which)
            this.AI.Actions.push(this.AI.createAction(0,null,punches_[1]));
        else
            this.AI.Actions.push(this.AI.createAction(0,null,kicks_[1]));
        this.AI.Actions.push(this.AI.createAction(CONSTANTS.ATTACKBUTTON_FRAMES,FLAGS.CLEAR_INPUT));
    }

    RyuAI.prototype.executeFireball = function(rnd)
    {
        rnd = rnd || getRand();
        if(!this.AI.Player.isMobile())
            return false;
        if(rnd > 66)
        {
            this.AI.Actions.push(this.AI.createAction(0,FLAGS.CLEAR_INPUT,lightFireballInput_));
            this.AI.Actions.push(this.AI.createAction(1,FLAGS.CLEAR_INPUT));
            return true;
        }
        else
        {
            this.AI.Actions.push(this.AI.createAction(0,FLAGS.CLEAR_INPUT,hardFireballInput_));
            this.AI.Actions.push(this.AI.createAction(1,FLAGS.CLEAR_INPUT));
            return true;
        }
    }


    RyuAI.prototype.parseAndSendInput = function()
    {
        return this.AI.parseAndSendInput();
    }

    RyuAI.prototype.onNewRound = function()
    {
        this.AI.reset();
    }

    RyuAI.prototype.reset = function()
    {
        this.AI.reset();
    }

    RyuAI.prototype.test = function()
    {
    }

    RyuAI.prototype.clearInput = function()
    {
        this.AI.clearInput();
    }

    RyuAI.prototype.onStartNonAttack = function(frame, attacker)
    {
        this.AI.onStartNonAttack(frame,attacker);
    }
    //fired when the player gets hit
    RyuAI.prototype.onTakeHit = function(frame, attacker)
    {
        this.AI.onTakeHit(frame, attacker);
    }
    //fired when the player gets hit
    RyuAI.prototype.onBlocked = function(frame, attacker)
    {
        this.AI.onBlocked(frame,attacker);
    }
    //fired when any enemy attack ends
    RyuAI.prototype.onEnemyEndAttack = function(frame, attacker)
    {
        this.reactAirborne(frame,attacker);
        this.AI.clearInput();
    }
    //fired when any enemy attack ends
    RyuAI.prototype.onEnemyVulnerable = function(frame, attacker)
    {
        this.AI.clearInput();
        this.react(frame, attacker)
    }
    //fired every frame an enemy attack is pending
    RyuAI.prototype.onEnemyAttackPending = function(frame,x,y,player,isSuperMove)
    {
    }
    //fired every frame an enemy projectile is pending
    RyuAI.prototype.onEnemyProjectilePending = function(frame,x,y,player,isSuperMove)
    {
        //just before the projectile is actually thrown, the attacker will be used instead of the projectile
        //if the player is facing the projectile, then counter it
        if(!this.AI.isProjectileReactBusy() 
            && !this.AI.Player.isAirborne() 
            && !this.AI.Player.isBlocking() 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && this.AI.Player.isFacingPlayer(player))
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);

            //console.log(dist);

            //jump in
            if(dist < 170000 && dist > 81000)
            {
                this.reset();
                this.doCounterProjectileCombo();
                this.AI.setProjectileReactBusy();
            }
            else if(dist < 20000)
            {
                var rnd = getRand();
                if(rnd > 50)
                    this.doMove("u1");
            }
            else
            {
                this.reset();
                var rnd = getRand();
                if(rnd > 50)
                {
                    this.executeFireball();
                }
                else
                {
                    if(!this.throwSuperFireball(true))
                        this.executeFireball();
                }
                this.AI.setProjectileReactBusy();
                return;
            }

        }
        //this.AI.onEnemyProjectileMoved(frame,x,y,projectile,isSuperMove);
    }


    //fired every frame an enemy projectile is active
    RyuAI.prototype.onEnemyProjectileMoved = function(frame,id,x,y,projectile,isSuperMove)
    {
        if(!!this.AI.IgnoreProjectileGone)
            return;
        if(!this.AI.Player.isAirborne()
            && this.AI.Actions.length == 0 
            && !this.AI.Player.isBlocking() 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && this.AI.Player.isFacingProjectile(projectile))
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);

            //console.log(dist);

            if(dist > 85000)
            {
                this.reset();
                var rnd = getRand();
                if(rnd > 70)
                {
                    this.executeFireball();
                }
                else
                {
                    if(!this.throwSuperFireball(true))
                        this.executeFireball();
                }
                this.AI.setProjectileReactBusy();
                return;
            }
            else
            {
                //jump straight up, over the projectile
                this.AI.IgnoreProjectileGone = true;
                switch(projectile.XSpeed)
                {
                    case 10: { if(dist < 74000 && dist > 64000) { this.reset(); this.AI.jumpUp(); this.AI.setProjectileReactBusy(); return; } break; }
                    case 11: { if(dist < 92000 && dist > 64000) { this.reset(); this.AI.jumpUp(); this.AI.setProjectileReactBusy(); return; } break; }
                    case 12: { if(dist < 92000 && dist > 64000) { this.reset(); this.AI.jumpUp(); this.AI.setProjectileReactBusy(); return; } break; }
                }
            }
        }
        this.AI.onEnemyProjectileMoved(frame,x,y,projectile,isSuperMove);
    }
    //fired when a projectile is off screen
    RyuAI.prototype.onEnemyProjectileGone = function(frame, id)
    {
        this.AI.onEnemyProjectileGone();
    }
    //fired when an enemy has been hit
    RyuAI.prototype.onAttackStateChanged = function(who,state)
    {
        this.AI.onAttackStateChanged(who,state);
    }
    //fired every attack frame
    RyuAI.prototype.onEnemyContinueAttack = function(frame, attacker, hitPoints)
    {
        this.AI.onEnemyContinueAttack(frame,attacker,hitPoints);
        this.reactAirborne(frame,attacker);
    }

    //fired at the start of any enemy attack
    RyuAI.prototype.onEnemyStartAttack = function(frame, attacker)
    {
        this.AI.onEnemyStartAttack(frame,attacker);
    }

    //fired at the start of any enemy attack
    RyuAI.prototype.onStartAttack = function()
    {
        this.AI.onStartAttack();
    }

    //fired at the end of any attack
    RyuAI.prototype.onAnimationEnded = function(name)
    {
        this.AI.onAnimationEnded();
    }

    //fired at the start of any attack
    RyuAI.prototype.onAnimationChanged = function(name)
    {
        this.AI.onAnimationChanged(name);
    }

    RyuAI.prototype.reactAirborne = function(frame,attacker)
    {
        var retVal = false;

        if(!this.AI.Player.isMobile())
            return retVal;

        if(!this.AI.Player.isBlocking())
        {
            if(this.AI.isAirborneReactBusy())
                return retVal;
        }
        
        var nbFrames = this.AI.Player.isBlocking() ? 4 : 0;
        var item = this.AI.getClosestAirborneEnemy();

        var rnd = getRand();
        if(item.X < 200)
        {
            if(!!attacker)
            {
                this.AI.reset();
                if(rnd > 50)
                {
                    this.doMove("k3");
                    retVal = true;
                }
                else
                {
                    this.doMove("u1");
                    retVal = true;
                }
                this.AI.setAirborneReactBusy();
            }
            else
            {
                this.AI.reset();
                this.doMove("k3");
                retVal = true;
                this.AI.setAirborneReactBusy();
            }
        }
        return retVal;
    }

    RyuAI.prototype.reactNotAirborne = function(frame,attacker)
    {
        var retVal = false;
        if(!this.AI.Player.isMobile())
            return retVal;


        var rnd = getRand();
        if(rnd > 50)
        {
        }
        else
        {
        }

        return retVal;
    }


    RyuAI.prototype.doMove = function(key) { this.execute(this.AI.SingleMoves[key]); }
    RyuAI.prototype.doCloseCombo = function(key) { this.execute(this.AI.CloseCombos[key]); }
    RyuAI.prototype.doVeryCloseCombo = function(key) { this.execute(this.AI.VeryCloseCombos[key]); }
    RyuAI.prototype.doJumpInCombo = function(key) { this.execute(this.AI.JumpInCombos[key]); }
    RyuAI.prototype.doCloseJumpInCounterCombo = function(key) { this.execute(this.AI.CounterCloseJumpInCombos[key]); }
    RyuAI.prototype.doCounterProjectileCombo = function(key) { this.execute(this.AI.CounterProjectileCombos[getRand(this.AI.CounterProjectileCombos.length-1)]); }

    RyuAI.prototype.execute = function(sequence)
    {
        var input = null;
        for(var i = 0; i < sequence.length; ++i)
        {
            input = null;
            switch(sequence[i].B)
            {
                case "get_close" : { this.AI.moveToEnemy(0,sequence[i].C); break; } case "jump_in" : { if(this.AI.getClosestEnemy().X < (sequence[i].D || this.AI.TOO_CLOSE)) { return; }; this.AI.jumpInToEnemy(0,sequence[i].C); break; }
                case "j" : { this.AI.jumpUp(); break; } case "fj" : { this.AI.jumpTowardEnemy(); break; } case "bj" : { this.AI.jumpAwayFromEnemy(); break; }
                case "lp1" : { input = lowPunches_[0]; break; } case "lp2" : { input = lowPunches_[1]; break; } case "lp3" : { input = lowPunches_[2]; break; }
                case "p1" : { input = punches_[0]; break; } case "p2" : { input = punches_[1]; break; } case "fp2" : { input = punches_[3]; break; } case "p3" : { input = punches_[2]; break; }
                case "k1" : { input = kicks_[0]; break; } case "k2" : { input = kicks_[1]; break; } case "k3" : { input = kicks_[2]; break; }
                case "lk1" : { input = lowKicks_[0]; break; } case "lk2" : { input = lowKicks_[1]; break; } case "lk3" : { input = lowKicks_[2]; break; }
                case "fb1" : { input = lightFireballInput_; break; } case "fb2" : { input = mediumFireballInput_; break; } case "fb3" : { input = hardFireballInput_; break; }
                case "sfb1" : { input = lightSuperFireballInput_; break; } case "sfb2" : { input = mediumSuperFireballInput_; break; } case "sfb3" : { input = hardSuperFireballInput_; break; }
                case "hk1" : { input = lightSKickInput_; break; } case "hk2" : { input = mediumSKickInput_; break; } case "hk3" : { input = hardSKickInput_; break; }
                case "u1" : { input = lightUppercutInput_; break; } case "u2" : { input = mediumUppercutInput_; break; } case "u3" : { input = hardUppercutInput_; break; }
                case "t1" : { this.executeThrow(0,true); break; } case "t2" : { this.executeThrow(1,true); break; }
            };
            this.AI.sendInput(FLAGS.CLEAR_INPUT,sequence[i].A || 0,input,sequence[i].H);
        }
        this.AI.sendInput(FLAGS.CLEAR_INPUT,2);
    }

    RyuAI.prototype.onEnemyDizzy = function(frame,attacker)
    {
        this.AI.reset();
        this.throwSuperFireball();
        this.AI.setBusy();
    }

    RyuAI.prototype.react = function(frame,attacker)
    {
        if(!this.AI.Player.isMobile())
            return;
        if(!!this.reactAirborne(frame,attacker))
        {
        }
        else if(!!this.reactNotAirborne(frame,null))
        {
        }
    }

    RyuAI.prototype.proact = function(frame)
    {
        if(!this.AI.Player.isMobile())
            return;

        if(!!this.reactAirborne(frame,null))
            return;

        var item = this.AI.getClosestEnemy();

        var rnd = getRand();
        var ignoreSetBusy = false;

        if(this.AI.Actions.length != 0)
            return;

        if(item.X < CONSTANTS.GRAPPLE_DISTANCE)
        {
            this.AI.reset();
            if(item.Player.isThrowable() && (this.AI.JustBecameMobile > 0))
            {
                if (rnd > 50)
                    this.doVeryCloseCombo(0);
                else
                    this.doVeryCloseCombo(1);
            }
            else
            {
                if (item.Player.isThrowable() && (rnd > 66))
                    this.doVeryCloseCombo(0);
                else if(item.Player.isThrowable() && (rnd > 33))
                    this.doVeryCloseCombo(1);
                else if(rnd > 10)
                    this.wanderBackward(50);
                this.AI.setBusy();
            }
        }
        else if(!!this.AI.isBusy())
        {
            return;
        }
        else if(item.X < 100)
        {
            this.AI.reset();
            if(rnd > 70)
                this.doCloseCombo(getRand(this.AI.CloseCombos.length-1));
            else if (item.Player.isThrowable() && (rnd > 60))
                this.doVeryCloseCombo(0);
            else if(item.Player.isThrowable() && (rnd > 50))
                this.doVeryCloseCombo(1);
            else if(rnd > 30)
                this.wanderBackward(50);
            else
                this.executeFireball(getRand());
            this.AI.setBusy();
        }
        else if(item.X < 350)
        {
            this.AI.reset();
            if(rnd > 95)
                this.wanderBackward(50);
            else if(rnd > 80)
                this.doJumpInCombo(getRand(this.AI.JumpInCombos.length-1));
            else if(rnd > 30)
                this.doCloseCombo(getRand(this.AI.CloseCombos.length-1));
            else
                this.executeFireball(getRand());
            this.AI.setBusy();
        }
        else
        {
            this.AI.reset();
            if(rnd > 80)
                this.executeFireball(getRand());
            else if(rnd > 50)
                this.doCloseCombo(getRand(this.AI.CloseCombos.length-1));
            else
            {
                this.doVeryCloseCombo(getRand(this.AI.VeryCloseCombos.length-1));
                this.AI.setBusy();
            }
        }
    }

    RyuAI.prototype.process = function(frame)
    {
        if(!this.AI.AllowOverrideBlock && !this.AI.Player.canBlock())
            this.AI.AllowOverrideBlock = true;

        if(!!this.AI.AllowOverrideBlock)
        {
            if(!this.AI.Player.isMobile())
            {
                if(!!this.AI.JustAttacked)
                    this.AI.JustBecameMobile = 3;
                return;
            }

            var rnd = getRand();
            this.proact(frame);

            this.AI.JustAttacked = false;
            this.AI.JustBecameMobile = (this.AI.JustBecameMobile > 0) ? this.AI.JustBecameMobile - 1 : 0;
        }
    }


    RyuAI.prototype.frameMove = function(frame)
    {
        this.handleCombo(frame);
        this.process(frame);
    }


    RyuAI.prototype.handleCombo = function(frame)
    {
        if(this.AI.Actions.length > 0)
        {
            if((this.AI.Actions[0].Frame == 0))
            {
                var retVal = this.parseAndSendInput();
                switch(retVal)
                {
                    case 1: { this.handleCombo(frame); break; }
                    default: break;
                }
            }
            else
            {
                this.AI.Actions[0].Frame = Math.max(this.AI.Actions[0].Frame - 1,0);
            }
        }
    }

    return new RyuAI();
}