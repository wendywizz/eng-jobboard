<?php
/**
 * Careerfy  Newsletter Class
 *
 * @package Newsletter
 */

if (!class_exists('Careerfy_Newsletter')) {

    /**
      Careerfy  Newsletter class used to implement the Custom flicker gallery widget.
     */
    class Careerfy_Newsletter extends WP_Widget {

        /**
         * Sets up a new careerfy  flicker widget instance.
         */
        public function __construct() {

            parent::__construct(
                    'careerfy_newsletter', // Base ID.
                    __('Newsletter', 'careerfy-frame'), // Name.
                    array('classname' => 'widget_newsletter', 'description' => __('Newsletter widget.', 'careerfy-frame'))
            );
        }
        /**
         * Outputs the careerfy  flicker widget settings form.
         *
         * @param array $instance Current settings.
         */
        function form($instance) {
            global $careerfy_form_fields, $careerfy_framework_options;

            $instance = wp_parse_args((array) $instance, array('title' => '', 'mc_lists' => ''));
            $title = $instance['title'];
            $mc_lists = $instance['mc_lists'];
            $mailchimp_api_key = '';
            $mailchimp_list = '';
            if (isset($careerfy_framework_options['careerfy-mailchimp-api-key'])) {
                $mailchimp_api_key = $careerfy_framework_options['careerfy-mailchimp-api-key'];
            }
            if (isset($careerfy_framework_options['careerfy-mailchimp-list'])) {
                $mailchimp_list = $careerfy_framework_options['careerfy-mailchimp-list'];
            }

            wp_enqueue_media();
            ?>
            <div class="careerfy-element-field">
                <div class="elem-label">
                    <label><?php esc_html_e('Title', 'careerfy-frame') ?></label>
                </div>
                <div class="elem-field">
                    <?php
                    $field_params = array(
                        'cus_name' => $this->get_field_name('title'),
                        'force_std' => $title,
                    );
                    $careerfy_form_fields->input_field($field_params);
                    ?>
                </div>
            </div>

            <?php
            if (isset($careerfy_framework_options['careerfy-mailchimp-api-key'])) {
                $mailchimp_api_key = $careerfy_framework_options['careerfy-mailchimp-api-key'];
            }

            $careerfy_mailchimp_list = array();
            if (function_exists('curl_init')) {
                $mailchimp_lists = careerfy_framework_mailchimp_list($mailchimp_api_key);
                if (is_array($mailchimp_lists) && isset($mailchimp_lists['data'])) {
                    foreach ($mailchimp_lists['data'] as $mc_list) {
                        $careerfy_mailchimp_list[$mc_list['id']] = $mc_list['name'];
                    }
                }
            }

            if (!empty($careerfy_mailchimp_list) && sizeof($careerfy_mailchimp_list) > 1) {
                ?>
                <div class="careerfy-element-field">
                    <div class="elem-label">
                        <label><?php esc_html_e('Select Lists', 'careerfy-frame') ?></label>
                    </div>
                    <div class="elem-field">
                        <?php
                        $field_params = array(
                            'cus_name' => $this->get_field_name('mc_lists') . '[]',
                            'options' => $careerfy_mailchimp_list,
                            'force_std' => $mc_lists,
                        );
                        $careerfy_form_fields->multi_select_field($field_params);
                        ?>
                    </div>
                </div>
                <?php
            }
            if ('' == $mailchimp_list || '' == $mailchimp_api_key) {
                echo '<p class="error-api">' . esc_html__('Please set Mailchimp', 'careerfy-frame') . ' ' . '<a href="' . admin_url('admin.php?page=theme_options&tab=8', '') . '" target="_blank">' . esc_html__('API settings', 'careerfy-frame') . '</a></p>';
            }
        }

        /**
         * Handles updating settings for the current careerfy  flicker widget instance.
         *
         * @param array $new_instance New settings for this instance as input by the user.
         * @param array $old_instance Old settings for this instance.
         * @return array Settings to save or bool false to cancel saving.
         */
        function update($new_instance, $old_instance) {
            $instance = $old_instance;
            $instance['title'] = $new_instance['title'];
            $instance['mc_lists'] = $new_instance['mc_lists'];
            return $instance;
        }

        /**
         * Outputs the content for the current careerfy  flicker widget instance.
         *
         * @param array $args Display arguments including 'before_title', 'after_title',
         * 'before_widget', and 'after_widget'.
         * @param array $instance Settings for the current Text widget instance.
         */
        function widget($args, $instance) {
            global $careerfy_framework_options;
            extract($args, EXTR_SKIP);

            $counter = rand(3333, 322342);
            $title = empty($instance['title']) ? '' : apply_filters('widget_title', $instance['title']);
            $title = htmlspecialchars_decode(stripslashes($title));
            $mc_lists = isset($instance['mc_lists']) ? $instance['mc_lists'] : '';
            $mailchimp_api_key = '';
            $mailchimp_list = array();
            if (isset($careerfy_framework_options['careerfy-mailchimp-api-key'])) {
                $mailchimp_api_key = $careerfy_framework_options['careerfy-mailchimp-api-key'];
            }
            if (isset($careerfy_framework_options['careerfy-mailchimp-list'])) {
                $mailchimp_list = $careerfy_framework_options['careerfy-mailchimp-list'];
            }

            $careerfy_mailchimp_list = array();
            $mailchimp_lists = careerfy_framework_mailchimp_list($mailchimp_api_key);
            if (is_array($mailchimp_lists) && isset($mailchimp_lists['data'])) {
                foreach ($mailchimp_lists['data'] as $mc_list) {
                    $careerfy_mailchimp_list[$mc_list['id']] = $mc_list['name'];
                }
            }

            $before_widget = isset($args['before_widget']) ? $args['before_widget'] : '';
            $after_widget = isset($args['after_widget']) ? $args['after_widget'] : '';

            $before_title = isset($args['before_title']) ? $args['before_title'] : '';
            $after_title = isset($args['after_title']) ? $args['after_title'] : '';

            echo ( $before_widget );

            echo '<div class="newsletter-widget-holder">';
            if ('' != $title) {
                echo '<i class="careerfy-icon careerfy-mail"></i>';
                echo ( $before_title ) . esc_html($title) . ( $after_title );
            }
            if (!empty($mailchimp_list) && '' != $mailchimp_api_key) { ?>
                <script>
                    function careerfy_mailchimp_submit<?php echo intval($counter); ?>(counter, admin_url) {
                        'use strict';
                        var $ = jQuery;
                        $('#newsletter_error_div_' + counter).fadeOut();
                        $('#newsletter_success_div_' + counter).fadeOut();
                        $('#process_' + counter).show();
                        $('#process_' + counter).html('<i class="fa fa-refresh fa-spin"></i>');

                        $.ajax({
                            type: 'POST',
                            url: admin_url,
                            data: "cp_email=" + $('#mc_email' + counter).val() + "&cp_fname=" + $('#mc_fname' + counter).val() + "&cp_lname=" + $('#mc_lname' + counter).val() + '&' + $('#mcform_' + counter).serialize() + '&action=careerfy_mailchimp',
                            dataType: "json",
                            success: function (response) {
                                $('#mcform_' + counter).get(0).reset();
                                if (response.type === 'error') {
                                    $('#process_' + counter).hide();
                                    $('#newsletter_mess_error_' + counter).html(response.msg);
                                    $('#newsletter_error_div_' + counter).fadeIn();
                                } else {
                                    $('#process_' + counter).hide();
                                    $('#newsletter_mess_success_' + counter).html(response.msg);
                                    $('#newsletter_success_div_' + counter).fadeIn();
                                }
                                $('#newsletter_mess_' + counter).fadeIn(600);
                                $('#newsletter_mess_' + counter).html(response);
                                $('#process_' + counter).html('');
                            }
                        });
                    }
                    function hide_div(div_hide) {
                        jQuery('#' + div_hide).hide();
                    }
                </script>
                <form action="javascript:careerfy_mailchimp_submit<?php echo intval($counter); ?>('<?php echo esc_js($counter); ?>','<?php echo admin_url('admin-ajax.php'); ?>')" id="mcform_<?php echo intval($counter); ?>" method="post">
                    <?php
                    if (!empty($careerfy_mailchimp_list) && !empty($mc_lists) && sizeof($mc_lists) > 1) { ?>
                        <ul class="mc-lists-fields">
                            <?php
                            foreach ($mc_lists as $mc_list) {
                                $mc_list_rand = rand(100000, 9999999);
                                if (isset($careerfy_mailchimp_list[$mc_list])) {  ?>
                                    <li><input id="mc_list_<?php echo ($mc_list_rand) ?>" type="checkbox" name="mc_lists[]" value="<?php echo ($mc_list) ?>"> <label for="mc_list_<?php echo ($mc_list_rand) ?>"><span></span><?php echo ($careerfy_mailchimp_list[$mc_list]) ?></label></li>
                                    <?php
                                }
                            }
                            ?>
                        </ul>
                        <?php } ?>
                    <ul class="mc-input-fields">
                        <li style="display: none;"><input name="mc_fname" id="mc_fname<?php echo intval($counter); ?>" value="" placeholder="<?php echo esc_html__('First Name', 'careerfy-frame'); ?>" type="text"></li>
                        <li style="display: none;"><input name="mc_lname" id="mc_lname<?php echo intval($counter); ?>" value="" placeholder="<?php echo esc_html__('Last Name', 'careerfy-frame'); ?>" type="text"></li>
                        <li><input type="email" id="mc_email<?php echo intval($counter); ?>" tabindex="0" name="mc_email" placeholder="<?php echo esc_html__('Your Email', 'careerfy-frame'); ?>"></li>
                        <li><label><input id="btn_newsletter_<?php echo intval($counter); ?>" value="<?php esc_html_e('Subscribe', 'careerfy-frame') ?>" type="submit"><span></span></label></li>
                    </ul>
                    <div id="process_<?php echo intval($counter); ?>" class="status status-message" style="display:none"></div>
                </form>
                <div id="newsletter_error_div_<?php echo intval($counter); ?>" style="display:none" class="alert alert-danger">
                    <button class="close" type="button" onclick="hide_div('newsletter_error_div_<?php echo intval($counter); ?>')" aria-hidden="true">×</button>
                    <p>
                        <i class="icon-warning"></i>
                        <span id="newsletter_mess_error_<?php echo intval($counter); ?>"></span>
                    </p>
                </div>
                <div id="newsletter_success_div_<?php echo intval($counter); ?>" style="display:none" class="alert alert-success">
                    <button class="close" type="button" onclick="hide_div('newsletter_success_div_<?php echo intval($counter); ?>')" aria-hidden="true">×</button>
                    <p><i class="icon-checkmark"></i><span id="newsletter_mess_success_<?php echo intval($counter); ?>"></span></p>
                </div>
                <?php
            } else {
                echo '<p class="error-api">' . esc_html__('Please contact to administrator to set settings for Newsletter API', 'careerfy-frame') . '</p>';
            }

            echo '</div>';

            echo ( $after_widget );
        }

    }

}
add_action('widgets_init', function() {return register_widget("careerfy_newsletter");});
