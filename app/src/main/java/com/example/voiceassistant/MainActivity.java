package com.example.voiceassistant;

import static android.content.ContentValues.TAG;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.os.StrictMode;

import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import com.google.android.gms.auth.api.identity.BeginSignInRequest;
import com.google.android.gms.auth.api.identity.SignInClient;
import com.google.android.gms.auth.api.identity.SignInCredential;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.theokanning.openai.OpenAiService;
import com.theokanning.openai.completion.CompletionRequest;

public class MainActivity extends AppCompatActivity{
    private TextView tv_speech_to_text;
    private TextView tv_text_to_speech;
    private static final int REQUEST_CODE_SPEECH_INPUT = 1;
    TextToSpeech textToSpeech;
    String[] promptElements = {"The following is a conversation with an AI assistant. He provides factual information. The assistant is helpful, creative, clever, polite, and very friendly. She speaks ",
            "\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?", "",
            "\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?"};
    String prevRes = "";

    private static final int REQ_ONE_TAP = 2;  // Can be any integer unique to the Activity.
    private final boolean showOneTapUI = true;

    private FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Spinner spinnerLanguages = findViewById(R.id.spinner_languages);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.languages, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_item);
        spinnerLanguages.setAdapter(adapter);
        String lang = spinnerLanguages.getSelectedItem().toString();
        promptElements[0] += lang + ".";
        HashMap<String, String> code = new HashMap<>();
        code.put("English", "en");
        code.put("Arabic", "ar");
        code.put("Chinese", "zh");
        code.put("Dutch", "nl");
        code.put("French", "fr");
        code.put("German", "dr");
        code.put("Greek", "el");
        code.put("Hebrew", "he");
        code.put("Hindi", "hi");
        code.put("Italian", "it");
        code.put("Japanese", "ja");
        code.put("Korean", "ko");
        code.put("Polish", "pl");
        code.put("Portuguese", "pt");
        code.put("Russian", "ru");
        code.put("Spanish", "es");
        code.put("Tamil", "ta");
        code.put("Vietnamese", "vi");

        mAuth = FirebaseAuth.getInstance();

        ImageView iv_mic = findViewById(R.id.iv_mic);
        tv_speech_to_text = findViewById(R.id.tv_speech_to_text);
        tv_text_to_speech = findViewById(R.id.tv_text_to_speech);

        textToSpeech = new TextToSpeech(getApplicationContext(), i -> {
            if(i!=TextToSpeech.ERROR){
                textToSpeech.setLanguage(Locale.US);
            }
        });

        BeginSignInRequest signInRequest = BeginSignInRequest.builder()
                .setGoogleIdTokenRequestOptions(BeginSignInRequest.GoogleIdTokenRequestOptions.builder()
                        .setSupported(true)
                        // Your server's client ID, not your Android client ID.
                        .setServerClientId("FIREBASE ID")
                        // Only show accounts previously used to sign in.
                        .setFilterByAuthorizedAccounts(true)
                        .build())
                .build();

        iv_mic.setOnClickListener(v -> {
            Intent intent
                    = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, code.get(lang));
            intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak to text");

            try {
                startActivityForResult(intent, REQUEST_CODE_SPEECH_INPUT);
            }
            catch (Exception e) {
                Toast.makeText(MainActivity.this, " " + e.getMessage(),
                                Toast.LENGTH_SHORT).show();
            }
        });

    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
//        SignInClient oneTapClient = null;
//        SignInCredential googleCredential = null;
//        try {
//            assert false;
//            googleCredential = oneTapClient.getSignInCredentialFromIntent(data);
//        } catch (ApiException e) {
//            e.printStackTrace();
//        }
//        String idToken = googleCredential.getGoogleIdToken();
//        if (idToken !=  null) {
//            // Got an ID token from Google. Use it to authenticate
//            // with Firebase.
//            AuthCredential firebaseCredential = GoogleAuthProvider.getCredential(idToken, null);
//            mAuth.signInWithCredential(firebaseCredential)
//                    .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
//                        @Override
//                        public void onComplete(@NonNull Task<AuthResult> task) {
//                            if (task.isSuccessful()) {
//                                // Sign in success, update UI with the signed-in user's information
//                                Log.d(TAG, "signInWithCredential:success");
//                                FirebaseUser user = mAuth.getCurrentUser();
//                                updateUI(user);
//                            } else {
//                                // If sign in fails, display a message to the user.
//                                Log.w(TAG, "signInWithCredential:failure", task.getException());
//                                updateUI(null);
//                            }
//                        }
//                    });
//        }
//        if (requestCode == REQ_ONE_TAP) {
//            try {
//                SignInCredential credential = oneTapClient.getSignInCredentialFromIntent(data);
//                idToken = credential.getGoogleIdToken();
//                if (idToken != null) {
//                    Log.d(TAG, "Got ID token.");
//                }
//            } catch (ApiException ignored) {
//            }
//        }

        StrictMode.setThreadPolicy(policy);
        if (requestCode == REQUEST_CODE_SPEECH_INPUT) {
            if (resultCode == RESULT_OK && data != null) {
                ArrayList<String> result = data.getStringArrayListExtra(
                        RecognizerIntent.EXTRA_RESULTS);
                tv_speech_to_text.setText(Objects.requireNonNull(result).get(0));

                promptElements[2] = promptElements[3] + prevRes;
                promptElements[3] = "\nHuman:" + Objects.requireNonNull(result).get(0) + "\nAI:";

                List<String> stop = Arrays.asList("\n", "Human:", "AI:");

                OpenAiService service = new OpenAiService("OPENAI API KEY");
                CompletionRequest completionRequest = CompletionRequest.builder()
                        .prompt(Arrays.toString(promptElements))
                        .echo(true)
                        .user("user")
                        .maxTokens(60)
                        .temperature(0.9)
                        .topP(1.0)
                        .frequencyPenalty(0.0)
                        .presencePenalty(0.6)
                        .stop(stop)
                        .build();
                String response = String.valueOf(service.createCompletion("davinci", completionRequest).getChoices().get(0));
                String formatted = response.substring(response.lastIndexOf("]") + 1, response.length() - 45).trim();
                System.out.println("RESPONSE:" + response);
                prevRes = formatted;
                System.out.println("FORMATTED" + formatted);
                String[] split = Objects.requireNonNull(result).get(0).split(" ");
                for (String s : new String[]{"anxiety", "kill", "gun", "depression", "suicide"}) {
                    if (Objects.requireNonNull(result).get(0).contains(s)) {
                        formatted = "call (988) for help";
                    }
                }
                tv_text_to_speech.setText(formatted);
                textToSpeech.speak(formatted,TextToSpeech.QUEUE_FLUSH,null);
            }
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        FirebaseUser currentUser = mAuth.getCurrentUser();
        updateUI(currentUser);
    }

    private void updateUI(FirebaseUser currentUser) {
    }
}
