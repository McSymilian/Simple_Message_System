package edu.ryder_cichy.sms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;

@EnableWebMvc
@Configuration
public class WebMVCConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
//        registry.addViewController("/").setViewName("index");
        registry.addViewController("/dashboard").setViewName("dashboard");
    }

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
////        registry.addResourceHandler("/static/**")
////                .addResourceLocations("classpath:/static/")
////                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)));
////
////        registry.addResourceHandler("/css/**")
////                .addResourceLocations("classpath:/static/css/")
////                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)));
////
////
////        registry.addResourceHandler("/js/**")
////                .addResourceLocations("classpath:/static/js/")
////                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)));
////
////
////        registry.addResourceHandler("/extraHTML/**")
////                .addResourceLocations("classpath:/static/extraHTML/")
////                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)));
////
////        registry.addResourceHandler("/**")
////                .addResourceLocations("classpath:/static/icons/")
////                .setCacheControl(CacheControl.noStore());
//    }
}
