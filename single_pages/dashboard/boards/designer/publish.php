<?php

defined('C5_EXECUTE') or die("Access Denied.");

?>



<form data-form="publish" v-cloak>
    <div class="row">
        <div class="col-lg-5">
            <button :disabled="selectedInstances.length === 0"
                    type="button"
                    class="btn btn-primary float-right btn-sm"
                    data-toggle="modal" data-target="#schedule-modal"><?=t('Add Scheduled Stripe')?></button>
            <h3><?=t('Boards')?></h3>
            <table class="table w-100">
                <thead>
                <tr>
                    <th><input  type="checkbox" v-model="bulkEnabled" @change="toggleBulk" /></th>
                    <th><?=t('Name')?></th>
                    <th><?=t('Site')?></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="instance in instances" :key="instance.boardInstanceID">
                    <td><input type="checkbox" v-model="selectedInstances" :value="instance.boardInstanceID" /></td>
                    <td>{{instance.name}}</td>
                    <td>{{instance.site.name}}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="col-lg-5 offset-1">
            <div>
                <h3><?=t('Stripes Shared by Selected Boards')?></h3>
                <p><?=t('Select some boards to see scheduled instances shared by those boards.')?></p>

            </div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="schedule-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <svg><use xlink:href="#icon-dialog-close" /></svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-6">
                                <div>
                                   <div><label><?=t('From')?></label></div>
                                   <v-date-picker
                                           :masks="{'input': 'YYYY-MM-DD'}"
                                           v-model='start'
                                           :input-props='{name: "start", class: ["form-control", {"is-invalid": invalidStartDate}]}'
                                   ></v-date-picker>
                                </div>


                            </div>
                            <div class="col-6">
                                <div>
                                    <div><label><?=t('To')?> <span class="text-muted"><?=t('Optional')?></span></label></div>
                                    <v-date-picker
                                            :masks="{'input': 'YYYY-MM-DD'}"
                                            v-model='end'
                                            :input-props='{name: "end", class: "form-control"}'
                                    ></v-date-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <?= $form->label('timezone', t('Time Zone')); ?>
                        <?= $form->select('timezone', $date->getTimezones(), ['v-model' => 'timezone'])?>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" :checked="lockType === 'L'" id="lockType1" type="radio" name="lockType" value="L">
                        <label class="form-check-label" for="lockType1">
                            <?=t('Lock stripe – only admins can change.')?>
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="lockType" id="lockType2" value="U">
                        <label class="form-check-label" for="lockType2">
                            <?=t('Share stripe – editors can remove.')?>
                        </label>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="save">Save changes</button>
                </div>
            </div>
        </div>
    </div>


</form>

<script type="text/javascript">
    $(function() {
        Concrete.Vue.activateContext('cms', function (Vue, config) {
            new Vue({
                el: 'form[data-form=publish]',
                components: config.components,
                data: {
                    instances: <?=json_encode($instances)?>,
                    selectedInstances: [4],
                    bulkEnabled: false,
                    invalidStartDate: false,
                    start: '',
                    end: '',
                    lockType: 'L',
                    timezone: '<?=date_default_timezone_get()?>'
                },

                computed: {
                    startFormatted() {
                        if (this.start) {
                            return moment(this.start).format("YYYY-MM-DD")
                        }
                        return null
                    },
                    endFormatted() {
                        if (this.end) {
                            return moment(this.end).format("YYYY-MM-DD")
                        }
                        return null
                    },
                },

                watch: {
                    start: function() {
                        this.invalidStartDate = false
                    }
                },
                methods: {
                    toggleBulk() {
                        if (this.bulkEnabled) {
                            this.instances.forEach(instance => this.selectedInstances.push(instance.boardInstanceID))
                        } else {
                            this.selectedInstances = [];
                        }
                    },
                    save() {
                        let valid = true
                        if (!this.startFormatted) {
                            valid = false
                            this.invalidStartDate = true
                        } else {
                            this.invalidStartDate = false
                        }
                        if (valid) {
                            new ConcreteAjaxRequest({
                                url: '<?=$view->action('submit')?>',
                                method: 'POST',
                                data: {
                                    ccm_token: '<?=$token->generate('submit')?>',
                                    elementId: '<?=$element->getID()?>',
                                    start: this.startFormatted,
                                    end: this.endFormatted,
                                    lockType: this.lockType,
                                    timezone: this.timezone,
                                    instances: this.selectedInstances
                                },
                                success: function (r) {
                                    window.location.href = '<?=URL::to('/dashboard/boards/designer')?>';
                                }
                            })
                        }
                    }
                }
            })
        })
    });
</script>